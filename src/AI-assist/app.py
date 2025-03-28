from flask import Flask, jsonify, request
from flask_cors import CORS
import json

from agent import Agent

app = Flask(__name__)
CORS(app)

agent = Agent()

@app.route('/store', methods=['POST'])
def store():
    patient_data = request.form.get("patient")

    if not patient_data:
        return jsonify({"error": "Patient data is required"}), 400

    agent.load_patient_data(json.loads(patient_data))
    agent.build_graph()

    return jsonify({"response": "Data stored successfully", "data": patient_data}), 201

@app.route('/query', methods=['POST'])
def query():
    hcp_query = request.form.get("query")

    resp = agent.query(hcp_query)

    return jsonify({"response" : resp}), 200


@app.route('/clear', methods=['GET'])
def clear():
    agent.clear_patient_data()

    return jsonify({"response": "Cleared!!"}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5090, debug=True)