import { QueryDocumentSnapshot, FirestoreDataConverter } from "firebase/firestore";
import { IPatient } from "../models/model";

//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
//Adapted to fit interfaces
const patientConverter: FirestoreDataConverter<IPatient> = {
  toFirestore: (data: IPatient) => {
    return {
      ...data,
      profileInformation: data.profileInformation || {}, 
      medicalHistory: data.medicalHistory || {}, 
      consultationNotes: data.consultationNotes || [],
      documents: data.documents || [],
    };
  },

  fromFirestore: (snap: QueryDocumentSnapshot): IPatient => {
    const data = snap.data();
    return {
      id: snap.id,
      profileInformation: data.profileInformation || null,
      medicalHistory: data.medicalHistory || null,
      consultationNotes: data.consultationNotes || [],
      documents: data.documents || [],
    } as IPatient;
  }
};

const hcpConverter: FirestoreDataConverter<IPatient> = {
  toFirestore: (data: IPatient) => {
    return {
      ...data,
      profileInformation: data.profileInformation || {}, 
      medicalHistory: data.medicalHistory || {}, 
      consultationNotes: data.consultationNotes || [],
      documents: data.documents || [],
    };
  },

  fromFirestore: (snap: QueryDocumentSnapshot): IPatient => {
    const data = snap.data();
    return {
      id: snap.id,
      profileInformation: data.profileInformation || null,
      medicalHistory: data.medicalHistory || null,
      consultationNotes: data.consultationNotes || [],
      documents: data.documents || [],
    } as IPatient;
  }
};

export { patientConverter, hcpConverter };
