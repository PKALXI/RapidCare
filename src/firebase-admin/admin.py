import firebase_admin
from firebase_admin import credentials
import string
import random
import uuid

import firebase_admin.auth
import firebase_admin.firestore

import secrets

import firebase_admin.storage

class Admin:
    def __init__(self):
        cred = credentials.Certificate("./serviceAccountKey.json")
        self.app = firebase_admin.initialize_app(cred)

    def verify_user(self, email, uuid):
        db = firebase_admin.firestore.client()
        doc_ref = db.collection(u'users').document(email)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()['uuid'] == uuid
        return False

    def get_user_role(self, email):
        db = firebase_admin.firestore.client()
        doc_ref = db.collection(u'users').document(email)
        doc = doc_ref.get()
        return doc.to_dict()['role']

    def delete_user(self, email, uuid):
        firebase_admin.auth.delete_user(uuid)
        self.delete_user_database(email)

    def delete_user_database(self, email): 
        db = firebase_admin.firestore.client()
        db.collection(u'users').document(email).delete()

    def generate_password(self, length=8):
        chars = string.ascii_letters + string.digits
        return ''.join(random.choice(chars) for i in range(length))

    def create_user(self, email, id):
        password = 'capstone'
        firebase_admin.auth.create_user(email=email, password=password, uid=str(id))


    def does_document_exist(self, filename, collection):
        db = firebase_admin.firestore.client()

        doc_ref = db.collection(collection).document(filename)
        doc = doc_ref.get()
        return doc.exists

    def add_document_to_collection(self, ids, filename, collection):
        db = firebase_admin.firestore.client()

        doc_ref = db.collection(collection).document(filename)
        doc_ref.set({
            u'file': filename,
            u'id': ids
        })

    def delete_document_from_collection(self, filename, collection):
        db = firebase_admin.firestore.client()

        doc_ref = db.collection(collection).document(filename)
        doc = doc_ref.get()
        id = doc.to_dict()['id']
        print(f'FROM ADMIN {id}')
        doc_ref.delete()

        return id