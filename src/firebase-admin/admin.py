"""
Author: Pranav Kalsi
Last Updated: April 7th
Purpose: This allows us to perform important operation with account and data management.
"""

import firebase_admin
from firebase_admin import credentials
import firebase_admin.auth
import firebase_admin.firestore
import firebase_admin.storage

# Docs: https://firebase.google.com/docs/reference/admin/python/

# Admin class to handle user management operations with Firebase
class Admin:
    def __init__(self):
        # Load the service account credentials from the specified JSON file
        cred = credentials.Certificate("./serviceAccountKey.json")
        # Initialize the Firebase app with the provided credentials
        self.app = firebase_admin.initialize_app(cred)

    def delete_user(self, email, uuid):
        # Delete the user from firbase auth
        firebase_admin.auth.delete_user(uuid)
        # self.delete_user_database(email)

    def create_user(self, email, id):
        # Set a default password for the new user
        password = "capstone"
        # Create a new user in firebase auth
        firebase_admin.auth.create_user(email=email, password=password, uid=str(id))
