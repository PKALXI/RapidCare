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
Last Updated: March 7th 
Purpose: Provides agent class for AI assistant functionality, such that user can Load and Query Patient data.
"""

import os
from flask import Flask, request, jsonify
from langchain.chat_models import init_chat_model
from langchain_openai import OpenAIEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import MessagesState, StateGraph, END
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.tools import tool
from langchain_community.document_loaders import JSONLoader
from langchain_community.document_loaders import TextLoader
from langchain.tools.base import StructuredTool


from dotenv import load_dotenv
import json


load_dotenv("../.env")


class Agent:
    def __init__(self):
        # initialize models + vector stores
        self.llm = init_chat_model("gpt-4o-mini", model_provider="openai")
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        self.vector_store = InMemoryVectorStore(self.embeddings)

    def load_patient_data(self, patient_data):
        """Loads, chunks, and indexes documents into vector store."""
        # store patient data in a temp file
        temp_file_path = "temp_patient_data.json"
        with open(temp_file_path, "w") as temp_file:
            json.dump(patient_data, temp_file)

        # Load and split JSON data
        json_loader = JSONLoader(
            file_path=temp_file_path,
            jq_schema=".",
            text_content=False,
        )

        json_docs = json_loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )
        text_splits = text_splitter.split_documents(json_docs)

        self.vector_store.add_documents(documents=text_splits)

    def clear_patient_data(self):
        # Clear the vector store and memory that checkpoints the convo
        self.vector_store = InMemoryVectorStore(self.embeddings)
        self.memory = MemorySaver()

    def retrieve(self, query: str):
        # Retrieve the relevant context based on the query
        retrieved_docs = self.vector_store.similarity_search(query, k=2)
        serialized = "\n\n".join(
            (f"Source: {doc.metadata}\nContent: {doc.page_content}")
            for doc in retrieved_docs
        )

        return serialized, retrieved_docs

    def _query_or_respond(self, state: MessagesState):
        # Generate tool call for retrieval or respond.
        llm_with_tools = self.llm.bind_tools([StructuredTool.from_function(self.retrieve)])
        response = llm_with_tools.invoke(state["messages"])
        return {"messages": [response]}

    def _generate(self, state: MessagesState):
        # Generate the answer
        recent_tool_messages = [
            message for message in reversed(state["messages"]) if message.type == "tool"
        ]
        docs_content = "\n\n".join(doc.content for doc in recent_tool_messages)

        system_message_content = (
            "You are an AI assistant helping a healthcare professional retrieve and analyze patient information. "
            "Use the following context to directly answer the query. "
            "If the information is not in the context, clearly state 'I don't have that specific information.'\n\n"
            f"CONTEXT:\n{docs_content}"
        )

        conversation_messages = [
            message
            for message in state["messages"]
            if message.type in ("human", "system")
        ]
        prompt = [SystemMessage(system_message_content)] + conversation_messages

        response = self.llm.invoke(prompt)
        return {"messages": [response]}

    def build_graph(self):
        # Build the graph for RAG functions.
        graph_builder = StateGraph(MessagesState)

        tools = ToolNode([StructuredTool.from_function(self.retrieve)])

        graph_builder.add_node("query_or_respond", self._query_or_respond)
        graph_builder.add_node("tools", tools)
        graph_builder.add_node("generate", self._generate)

        graph_builder.set_entry_point("query_or_respond")
        graph_builder.add_conditional_edges(
            "query_or_respond", tools_condition, {END: END, "tools": "tools"}
        )
        graph_builder.add_edge("tools", "generate")
        graph_builder.add_edge("generate", END)

        self.memory = MemorySaver()
        self.graph = graph_builder.compile(checkpointer=self.memory)

    def query(self, hcp_query):
        # Runs the query through the graph.
        config = {"configurable": {"thread_id": "abc123"}}

        messages = [{"role": "user", "content": hcp_query}]

        result = None
        for step in self.graph.stream(
            {"messages": messages}, stream_mode="values", config=config
        ):
            step["messages"][-1].pretty_print()
            if "messages" in step:
                result = step["messages"][-1].content

        return result
