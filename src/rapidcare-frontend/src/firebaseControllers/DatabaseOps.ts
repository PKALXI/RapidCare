import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  IHealthcareProfessional,
  IHospital,
  INetworkInfo,
  IPatient,
} from "../models/model";
import {
  healthcareProfessionalConverter,
  hospitalConverter,
  networkInfoConverter,
  patientConverter,
} from "../firebaseControllers/converters";

const PATIENT_COLLECTION = "patients";
const HEALTHCARE_PROFESSIONAL_COLLECTION = "healthcare_professional";
const HOSPITAL_COLLECTION = "hospitals";
const ADMIN_COLLECTION = "admin";

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

//https://firebase.google.com/docs/firestore/manage-data/add-data
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
};
