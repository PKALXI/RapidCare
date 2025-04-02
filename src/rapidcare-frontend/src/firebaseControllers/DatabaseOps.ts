//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
// https://firebase.google.com/docs/firestore

/**
 * Author: Pranav Kalsi
 * Last Modified: March 7th
 * Purpose: Provide functionality to interact with DB and specific functions
 */

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  IHealthcareProfessional,
  IHospital,
  IMessage,
  INetworkInfo,
  IPatient,
  ISoapNote,
} from "../models/model";
import {
  healthcareProfessionalConverter,
  hospitalConverter,
  messageConverter,
  networkInfoConverter,
  patientConverter,
} from "../firebaseControllers/converters";

// Constants for collection names
const PATIENT_COLLECTION = "patients";
const HEALTHCARE_PROFESSIONAL_COLLECTION = "healthcare_professional";
const HOSPITAL_COLLECTION = "hospitals";
const ADMIN_COLLECTION = "admin";
const CHAT_COLLECTION = "chat";

// Objects representing collections in the db
const patientCollection = collection(db, PATIENT_COLLECTION).withConverter(
  patientConverter
);

const hospitalCollection = collection(db, HOSPITAL_COLLECTION).withConverter(
  hospitalConverter
);

const healthcareProfessionalCollection = collection(
  db,
  HEALTHCARE_PROFESSIONAL_COLLECTION
).withConverter(healthcareProfessionalConverter);

const networkInfoCollection = collection(db, ADMIN_COLLECTION).withConverter(
  networkInfoConverter
);

const AIChatCollection = collection(db, CHAT_COLLECTION).withConverter(
  messageConverter
);

//https://firebase.google.com/docs/firestore/manage-data/add-data
/**
 * This function support add/updating a message in the collection
 *
 * @async
 * @param {IMessage} message 
 * @returns {*} 
 */
const addMessage = async (message: IMessage) => {
  const docRef = doc(AIChatCollection, message.id);
  await setDoc(docRef, message);
};

/**
 * This method allows addign a SOAP note to a patient, by updating the consultation notes.
 *
 * @async
 * @param {string} patientId 
 * @param {ISoapNote} soapNote 
 * @returns {*} 
 */
const addSoap = async (patientId: string, soapNote: ISoapNote) => {
  try {
    const patientDocRef = doc(patientCollection, patientId);
    const patientDoc = await getDoc(patientDocRef);

    if (patientDoc.exists()) {
      const patientData = patientDoc.data() as IPatient;

      const updatedConsultationNotes = [
        ...(patientData.consultationNotes || []),
        soapNote,
      ];

      // Use updateDoc to only update the consultationNotes field
      await updateDoc(patientDocRef, {
        consultationNotes: updatedConsultationNotes,
      });

      console.log("SOAP note appended to patient's consultation notes.");
    } else {
      console.error("No such patient document!");
    }
  } catch (error) {
    console.error("Error appending SOAP note:", error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

/**
 * Add a administrator to the network
 *
 * @async
 * @param {INetworkInfo} admin 
 * @returns {*} 
 */
const addAdmin = async (admin: INetworkInfo) => {
  const docRef = doc(networkInfoCollection, admin.id);
  await setDoc(docRef, admin);
};

/**
 * Remove a healthcare professional from the collection
 *
 * @async
 * @param {IHealthcareProfessional} healthCareProfessional 
 * @returns {*} 
 */
const deleteAdmin = async (healthCareProfessional: IHealthcareProfessional) => {
  const docRef = doc(networkInfoCollection, healthCareProfessional.id);
  await deleteDoc(docRef);
};

/**
 *  Add a healthcare professional to the repsective collection
 *
 * @async
 * @param {IHealthcareProfessional} healthCareProfessional 
 * @returns {*} 
 */
const addHealthCareProfessional = async (
  healthCareProfessional: IHealthcareProfessional
) => {
  const docRef = doc(
    healthcareProfessionalCollection,
    healthCareProfessional.id
  );
  await setDoc(docRef, healthCareProfessional);
};

/**
 * Remove healthcare professional from collection
 *
 * @async
 * @param {IHealthcareProfessional} healthCareProfessional 
 * @returns {*} 
 */
const deleteHealthCareProfessional = async (
  healthCareProfessional: IHealthcareProfessional
) => {
  const docRef = doc(
    healthcareProfessionalCollection,
    healthCareProfessional.id
  );
  await deleteDoc(docRef);
};

/**
 * Add hospital to the data base
 *
 * @async
 * @param {IHospital} hospital 
 * @returns {*} 
 */
const addHospital = async (hospital: IHospital) => {
  const docRef = doc(hospitalCollection, hospital.id);
  await setDoc(docRef, hospital);
};

/**
 * Delete hospital from the database
 *
 * @async
 * @param {IHospital} hospital 
 * @returns {*} 
 */
const deleteHospital = async (hospital: IHospital) => {
  const docRef = doc(hospitalCollection, hospital.id);
  await deleteDoc(docRef);
};

/**
 * Add patient to the collection
 *
 * @async
 * @param {IPatient} patient 
 * @returns {*} 
 */
const addPatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await setDoc(docRef, patient);
};

/**
 * Get a patient from the database
 *
 * @async
 * @param {string} id 
 * @returns {unknown} 
 */
const getPatient = async (id: string) => {
  const docRef = doc(patientCollection, id);
  const document = await getDoc(docRef);
  if (document.exists()) {
    const patient = document.data() as IPatient;
    return patient;
  }
  return null;
};

/**
 * updatePatient in the database
 *
 * @async
 * @param {IPatient} patient 
 * @returns {*} 
 */
const updatePatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await setDoc(docRef, patient);
};

/**
 * Delete patient from the collection
 *
 * @async
 * @param {IPatient} patient 
 * @returns {*} 
 */
const deletePatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await deleteDoc(docRef);
};

/**
 * Sample empty patient template
 *
 * @type {IPatient}
 */
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
      maritalStatus: "",
    },
    contactInformation: {
      phone: "",
      address: "",
      email: "",
    },
  },
  medicalHistory: {
    medicalHistory: "",
    familyHistory: "",
    allergies: "",
    medications: "",
  },
  consultationNotes: [],
  documents: [],
  prescriptions: [],
  referrals: [],
};

// Export key collections and functions
export {
  networkInfoCollection,
  addAdmin,
  deleteAdmin,
  addHealthCareProfessional,
  deleteHealthCareProfessional,
  healthcareProfessionalCollection,
  hospitalCollection,
  patientCollection,
  deleteHospital,
  addHospital,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient,
  addSoap,
  addMessage,
  AIChatCollection,
};
