import firebase_admin
from firebase_admin import credentials
import string
import random
import firebase_admin.auth
import firebase_admin.firestore

import firebase_admin.storage

# Docs: https://firebase.google.com/docs/reference/admin/python/

class Admin:
    def __init__(self):
        cred = credentials.Certificate("./serviceAccountKey.json")
        self.app = firebase_admin.initialize_app(cred)

    def delete_user(self, email, uuid):
        firebase_admin.auth.delete_user(uuid)
        self.delete_user_database(email)

    def create_user(self, email, id):
        password = 'capstone'
        firebase_admin.auth.create_user(email=email, password=password, uid=str(id))


