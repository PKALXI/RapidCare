//https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
// https://firebase.google.com/docs/firestore

/**
 * Author: Pranav Kalsi
 * Last Modified: March 7th
 * Purpose: Provide functionality to pull and push our models to firebase
 */

import {
  QueryDocumentSnapshot,
  FirestoreDataConverter,
} from "firebase/firestore";
import {
  IHealthcareProfessional,
  IHospital,
  IMessage,
  INetworkInfo,
  IPatient,
} from "../models/model";

//Adapted to fit interfaces the converters simply allow us to convert our models to accepted firestore format and the reverse when pulling data.

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
  },
};

const hospitalConverter: FirestoreDataConverter<IHospital> = {
  toFirestore: (data: IHospital) => {
    return {
      ...data,
      name: data.name || "",
      address: data.address || "",
      email: data.email || "",
      phone: data.phone || "",
      bedCapacity: data.bedCapacity || 0,
      operatingHours: data.operatingHours || "",
    };
  },

  fromFirestore: (snap: QueryDocumentSnapshot): IHospital => {
    const data = snap.data();
    return {
      id: snap.id,
      name: data.name || "",
      address: data.address || "",
      email: data.email || "",
      phone: data.phone || "",
      bedCapacity: data.bedCapacity || 0,
      operatingHours: data.operatingHours || "",
    } as IHospital;
  },
};

const healthcareProfessionalConverter: FirestoreDataConverter<IHealthcareProfessional> =
  {
    toFirestore: (data: IHealthcareProfessional) => {
      return {
        ...data,
        name: data.name || "",
        role: data.role || "",
        hospital: data.hospital || "",
        department: data.department || "",
        email: data.email || "",
        phone: data.phone || "",
        employmentStatus: data.employmentStatus || "",
      };
    },

    fromFirestore: (snap: QueryDocumentSnapshot): IHealthcareProfessional => {
      const data = snap.data();
      return {
        id: snap.id,
        name: data.name || "",
        role: data.role || "",
        hospital: data.hospital || "",
        department: data.department || "",
        email: data.email || "",
        phone: data.phone || "",
        employmentStatus: data.employmentStatus || "",
      } as IHealthcareProfessional;
    },
  };

const networkInfoConverter: FirestoreDataConverter<INetworkInfo> = {
  toFirestore: (data: INetworkInfo) => {
    return {
      networkName: data.networkName || "",
      typeOfNetwork: data.typeOfNetwork || "Public",
      mainContact: data.mainContact || "",
      email: data.email || "",
      phone: data.phone || "",
      website: data.website || "",
      address: data.address || "",
    };
  },

  fromFirestore: (snap: QueryDocumentSnapshot): INetworkInfo => {
    const data = snap.data();
    return {
      networkName: data.networkName || "",
      typeOfNetwork: data.typeOfNetwork || "Public",
      mainContact: data.mainContact || "",
      email: data.email || "",
      phone: data.phone || "",
      website: data.website || "",
      address: data.address || "",
    } as INetworkInfo;
  },
};

const messageConverter = {
  toFirestore: (message: IMessage) => {
    return {
      sender: message.sender,
      reciever: message.reciever,
      date: message.date.toISOString(),
      message: message.message,
    };
  },

  fromFirestore: (snap: QueryDocumentSnapshot): IMessage => {
    const data = snap.data();
    return {
      sender: data.sender || "",
      reciever: data.reciever || "",
      date: data.date ? new Date(data.date) : new Date(),
      message: data.message || "",
    } as IMessage;
  },
};

// Export the converters needed for CRUD operation
export {
  networkInfoConverter,
  healthcareProfessionalConverter,
  patientConverter,
  hospitalConverter,
  messageConverter,
};
