import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IPatient } from "../models/model";
import { patientConverter } from "../firebaseControllers/converters";

const PATIENT_COLLECTION = "patients";
const HEALTHCARE_PROFESSIONAL_COLLECTION = "healthcare_professional";

//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
//TODO: Add hcp collection
const patientCollection = collection(db, PATIENT_COLLECTION).withConverter(patientConverter);

//https://firebase.google.com/docs/firestore/manage-data/add-data
const addPatient = async (patient: IPatient) => {
    const docRef = doc(patientCollection, patient.id);
    await setDoc(docRef, patient);
};

const updatePatient = (patient : IPatient) => {
    //TODO
}

const deletePatient = (patient : IPatient) => {
    //TODO
}

export {patientCollection, addPatient, updatePatient, deletePatient };