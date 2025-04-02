"""
Author: Pranav Kalsi
Last Updated: April 7th
Purpose: This allows us to perform important operation with account and data management.
"""

from admin import Admin
from flask import Flask, request, jsonify
from flask_cors import CORS

# https://firebase.google.com/docs/reference/admin/python/

admin = Admin()

app = Flask(__name__)
CORS(app)

"""
Endpoint to create a user in the db and a account
"""
@app.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    email = data.get("email")
    user_id = data.get("id")

    print(email, user_id)

    if not email or not user_id:
        return jsonify({"error": "Email and ID are required"}), 400

    try:
        admin.create_user(email, user_id)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

"""
Endpoint to delete a user in the db and the associated account
"""
@app.route("/delete_user", methods=["DELETE"])
def delete_user():
    data = request.json
    email = data.get("email")
    user_id = data.get("id")

    print(email, user_id)

    if not email or not user_id:
        return jsonify({"error": "Email and ID are required"}), 400

    try:
        admin.delete_user(email, user_id)
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5080, debug=True)
