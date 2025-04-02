"""
STARTER CODE TAKEN FROM THE FOLLOWING SOURCES AND EDITED TO FIT THE USE CASE:

https://python.langchain.com/docs/concepts/prompt_templates/
https://python.langchain.com/docs/concepts/document_loaders/
https://python.langchain.com/docs/integrations/document_loaders/json/
https://python.langchain.com/docs/concepts/embedding_models/
https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-5-customizing-state
https://python.langchain.com/docs/how_to/document_loader_pdf/
https://python.langchain.com/docs/tutorials/rag/
https://python.langchain.com/api_reference/core/prompts/langchain_core.prompts.chat.ChatPromptTemplate.html
https://langchain-ai.github.io/langgraph/tutorials/introduction/
https://python.langchain.com/docs/tutorials/chatbot/
https://python.langchain.com/docs/tutorials/qa_chat_history/
https://github.com/langchain-ai/langchain/discussions/9404
"""

"""
Author: Pranav Kalsi
Last Updated: April 7th
Purpose: This helps take a raw transcription and provide a diagnosis along with a treatment plan
"""

from typing import Literal
import os

from flask_cors import CORS

from flask import Flask, request, jsonify
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import START, StateGraph
from typing_extensions import Annotated, List, TypedDict
from langchain_openai import OpenAIEmbeddings
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv("../.env")
app = Flask(__name__)
CORS(app)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
llm = init_chat_model("gpt-4o-mini", model_provider="openai")

files = ["context1.pdf", "context2.pdf", "context3.pdf"]

all_splits = []
for file in files:
    loader = PyPDFLoader(file)
    docs = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    all_splits.extend(splits)

# Update metadata (illustration purposes)
total_documents = len(all_splits)
third = total_documents // 3

for i, document in enumerate(all_splits):
    if i < third:
        document.metadata["section"] = "beginning"
    elif i < 2 * third:
        document.metadata["section"] = "middle"
    else:
        document.metadata["section"] = "end"

# Index chunks
vector_store = InMemoryVectorStore(embeddings)
_ = vector_store.add_documents(all_splits)


# Define schema for search
class Search(TypedDict):
    """Search query."""

    query: Annotated[str, ..., "Search query to run."]
    section: Annotated[Literal["beginning", "middle", "end"], ..., "Section to query."]


# Define refined prompt for question-answering
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
    You are a highly knowledgeable medical assistant. Use ONLY the provided context to answer questions. 
    If the context is insufficient, say 'I cannot answer this based on the provided information.' 
    
    Provide your response in the following structured format: 
    {{
      "diagnosis": "Include clear medical terminology, symptoms, and potential conditions.",
      "medicine": "Based on the diagnosis above, suggest appropriate medications along with dosage and purpose.",
      "plan": "Based on the diagnosis and medications, provide a comprehensive treatment plan including dosage schedule, duration, follow-up recommendations, and any lifestyle modifications."
    }}
    
    Ensure your suggestions flow logically from the diagnosis to treatment recommendations. Your answer should be concise yet comprehensive, strictly relying on the provided medical context.
    """,
        ),
        ("human", "Context: {context}\n\n Question: {question}"),
        (
            "assistant",
            "I'll help answer your question based on the provided medical context. Let me analyze the information carefully.",
        ),
    ]
)


# Define state for application
class State(TypedDict):
    question: str
    query: Search
    context: List[Document]
    answer: str


def analyze_query(state: State):
    # produce a response
    structured_llm = llm.with_structured_output(Search)
    query = structured_llm.invoke(state["question"])
    return {"query": query}


def retrieve(state: State):
    # Retrieve from the vector store
    query = state["query"]
    retrieved_docs = vector_store.similarity_search(
        query["query"],
        filter=lambda doc: doc.metadata.get("section") == query["section"],
    )
    return {"context": retrieved_docs}


def generate(state: State):
    # Generate a response
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}


# Build and compile the graph
graph_builder = StateGraph(State).add_sequence([analyze_query, retrieve, generate])
graph_builder.add_edge(START, "analyze_query")
graph = graph_builder.compile()


"""
This is the endpoint that allows interaction with the RAG Chain
"""
@app.route("/predict", methods=["POST"])
def predict():
    input_message = request.form.get("transcription")

    if not input_message:
        return jsonify({"error": "No transcription provided"}), 400

    try:
        initial_state = {
            "question": input_message,
            "query": {"query": "", "section": "beginning"},
            "context": [],
            "answer": "",
        }

        result = graph.invoke(initial_state)

        if result and "answer" in result:
            return jsonify({"response": result["answer"]})
        else:
            return jsonify({"error": "No response generated"}), 500

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=False)
