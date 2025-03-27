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

const PATIENT_COLLECTION = "patients";
const HEALTHCARE_PROFESSIONAL_COLLECTION = "healthcare_professional";
const HOSPITAL_COLLECTION = "hospitals";
const ADMIN_COLLECTION = "admin";
const CHAT_COLLECTION = "chat";

//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
//TODO: Add hcp collection
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
const addMessage = async (message: IMessage) => {
  const docRef = doc(AIChatCollection, message.id);
  await setDoc(docRef, message);
};

const addSoap = async (
  patientId: string,
  soapNote: ISoapNote
) => {
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

const addAdmin = async (admin: INetworkInfo) => {
  const docRef = doc(networkInfoCollection, admin.id);
  await setDoc(docRef, admin);
};

const deleteAdmin = async (healthCareProfessional: IHealthcareProfessional) => {
  const docRef = doc(networkInfoCollection, healthCareProfessional.id);
  await deleteDoc(docRef);
};

const addHealthCareProfessional = async (
  healthCareProfessional: IHealthcareProfessional
) => {
  const docRef = doc(
    healthcareProfessionalCollection,
    healthCareProfessional.id
  );
  await setDoc(docRef, healthCareProfessional);
};

const deleteHealthCareProfessional = async (
  healthCareProfessional: IHealthcareProfessional
) => {
  const docRef = doc(
    healthcareProfessionalCollection,
    healthCareProfessional.id
  );
  await deleteDoc(docRef);
};

const addHospital = async (hospital: IHospital) => {
  const docRef = doc(hospitalCollection, hospital.id);
  await setDoc(docRef, hospital);
};

const deleteHospital = async (hospital: IHospital) => {
  const docRef = doc(hospitalCollection, hospital.id);
  await deleteDoc(docRef);
};

const addPatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await setDoc(docRef, patient);
};

const getPatient = async (id: string) => {
  const docRef = doc(patientCollection, id);
  const document = await getDoc(docRef);
  if (document.exists()) {
    const patient = document.data() as IPatient;
    return patient;
  }
  return null;
};

const updatePatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await setDoc(docRef, patient);
};

const deletePatient = async (patient: IPatient) => {
  const docRef = doc(patientCollection, patient.id);
  await deleteDoc(docRef);
};

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
