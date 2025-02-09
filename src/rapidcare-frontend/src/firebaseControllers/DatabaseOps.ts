import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IPatient } from "../models/model";
import { hcpConverter, patientConverter } from "../firebaseControllers/converters";

const PATIENT_COLLECTION = "patients";
const HEALTHCARE_PROFESSIONAL_COLLECTION = "healthcare_professional";

//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
//TODO: Add hcp collection
const patientCollection = collection(db, PATIENT_COLLECTION).withConverter(patientConverter);
const employeeCollection = collection(db, HEALTHCARE_PROFESSIONAL_COLLECTION).withConverter(hcpConverter);

//https://firebase.google.com/docs/firestore/manage-data/add-data
const addPatient = async (patient: IPatient) => {
    const docRef = doc(patientCollection, patient.id);
    await setDoc(docRef, patient);
};

const getPatient = async(id : string) => {
    const docRef = doc(patientCollection, id);
    const document = (await getDoc(docRef));
    if (document.exists()) {
        const patient = document.data() as IPatient;
        return patient;
    }
    return null;
}

const updatePatient = async(patient : IPatient) => {
    const docRef = doc(patientCollection, patient.id);
    await setDoc(docRef, patient);
}

const deletePatient = async(patient : IPatient) => {
    const docRef = doc(patientCollection, patient.id);
    await deleteDoc(docRef);
}

export const emptyPatient: IPatient = {
    id: "",
    profileInformation: {
        demographics: {
            name: "",
            gender: "",
            dateOfBirth: "",
            age: 0,
            weight: 0,
            height: 0,
            maritalStatus: ""
        },
        contactInformation: {
            phone: "",
            address: "",
            email: ""
        }
    },
    medicalHistory: {
        medicalHistory: "",
        familyHistory: "",
        allergies: "",
        medications: "",
    },
    consultationNotes: [],
    documents: []
};

export {patientCollection, getPatient, addPatient, updatePatient, deletePatient };