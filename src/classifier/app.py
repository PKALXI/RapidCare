"""
STARTER CODE TAKEN FROM THE FOLLOWING SOURCES AND EDITED TO FIT THE USE CASE:

https://python.langchain.com/docs/concepts/prompt_templates/
https://python.langchain.com/docs/concepts/document_loaders/
https://python.langchain.com/docs/concepts/embedding_models/
https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-5-customizing-state
https://python.langchain.com/docs/how_to/document_loader_pdf/
https://python.langchain.com/docs/tutorials/rag/
https://python.langchain.com/api_reference/core/prompts/langchain_core.prompts.chat.ChatPromptTemplate.html
https://langchain-ai.github.io/langgraph/tutorials/introduction/
https://python.langchain.com/docs/tutorials/chatbot/
"""

"""
Author: Pranav Kalsi
Last Updated: April 7th
Purpose: This helps take a raw transcription and split it into the relevant fields.
"""

from typing import Literal
import os

from flask_cors import CORS

from flask import Flask, request, jsonify
from langgraph.graph import START, StateGraph
from typing_extensions import Annotated, List, TypedDict
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv("../.env")

app = Flask(__name__)

CORS(app)

llm = init_chat_model(
    "gpt-4o-mini", model_provider="openai", api_key=os.environ.get("OPENAI_API_KEY")
)


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
    You are a highly knowledgeable medical assistant specializing in extracting key details from doctor-patient conversations. 
    
    Your goal is to identify and extract essential medical information from the provided transcription. Use the following structured format for your response:
    {{
        "reason_for_visit": "",
        "symptoms": "",
        "allergies": "",
        "current_medication": ""
    }}

    - Extract the **reason for visit** by identifying phrases that describe the primary concern or condition.
    - Extract **symptoms** by recognizing references to physical, emotional, or mental discomfort described by the patient.
    - Extract **allergies** by noting any references to medication, food, or environmental triggers.
    - Extract **current medication** by identifying any drugs or treatments mentioned as part of the patient's ongoing care.

    If any of these details are missing from the conversation, leave that field empty.

    If the context is insufficient to extract this information, respond with empty fields for all.
     
    """,
        ),
        ("human", "Transcription: {question}"),
        ("assistant", "I'll extract the key details from the conversation."),
    ]
)


# Define state for application
class State(TypedDict):
    question: str
    answer: str


def generate(state: State):
    messages = prompt.invoke({"question": state["question"]})
    response = llm.invoke(messages)
    return {"answer": response.content}


graph_builder = StateGraph(State).add_sequence([generate])
graph_builder.add_edge(START, "generate")
graph = graph_builder.compile()


@app.route("/predict", methods=["POST"])
def predict():
    input_message = request.form.get("transcription")

    if not input_message:
        return jsonify({"error": "No transcription provided"}), 400

    try:
        initial_state = {"question": input_message, "answer": ""}

        result = graph.invoke(initial_state)

        if result and "answer" in result:
            return jsonify({"response": result["answer"]})
        else:
            return jsonify({"error": "No response generated"}), 500

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5010, debug=True)
