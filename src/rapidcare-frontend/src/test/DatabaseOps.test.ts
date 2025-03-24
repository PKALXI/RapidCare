import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import {
  addHospital,
  deleteHospital,
  deletePatient,
  addAdmin,
  deleteAdmin,
  addHealthCareProfessional,
  deleteHealthCareProfessional,
  addPatient,
  getPatient,
  updatePatient,
} from "../firebaseControllers/DatabaseOps";
import {
  mockPatient,
  mockHealthCareProfessional,
  mockHospital,
  mockAdmin,
  mockPatient2,
} from "../mockData/mockData";

describe("DatabaseOps", () => {
  beforeAll(async () => {
    // Add any necessary setup data here if needed
  });

  afterAll(async () => {
    // Clear all collections or specific documents
  });

  test("should add a valid document to database", async () => {
    await addAdmin(mockAdmin);
    const docSnapshot = await getDoc(doc(db, "admin", mockAdmin.id));
    expect(docSnapshot.exists()).toBe(true);

    await addHealthCareProfessional(mockHealthCareProfessional);
    const docSnapshot1 = await getDoc(
      doc(db, "healthcare_professional", mockHealthCareProfessional.id)
    );
    expect(docSnapshot1.exists()).toBe(true);

    await addHospital(mockHospital);
    const docSnapshot2 = await getDoc(doc(db, "hospitals", mockHospital.id));
    expect(docSnapshot2.exists()).toBe(true);

    await addPatient(mockPatient);
    const docSnapshot3 = await getDoc(doc(db, "patients", mockPatient.id));
    expect(docSnapshot3.exists()).toBe(true);
  });

  test("should not add duplicate document", async () => {
    await addPatient(mockPatient);
    await addPatient(mockPatient);

    const patientsCollection = collection(db, "patients");
    const querySnapshot = await getDocs(patientsCollection);

    const matchingPatients = querySnapshot.docs.filter(
      (doc) => doc.id === mockPatient.id
    );
    expect(matchingPatients.length).toBe(1);
  });

  test("should retreive correct existing document", async () => {
    const patient = await getPatient(mockPatient.id);
    expect(patient).toMatchObject(mockPatient);
  });

  test("should return null for a non-existent document", async () => {
    const patient = await getPatient("1234567");
    expect(patient).toBeNull();
  });

  test("should update the correct existing document", async () => {
    await updatePatient(mockPatient2);
    const docSnapshot = await getDoc(doc(db, "patients", mockPatient2.id));
    expect(docSnapshot.data()).toMatchObject(mockPatient2);
  });

  test("deleteAdmin should delete a existing document", async () => {
    await deleteAdmin(mockHealthCareProfessional);
    const docSnapshot = await getDoc(
      doc(db, "admin", mockHealthCareProfessional.id)
    );
    expect(docSnapshot.exists()).toBe(false);

    await deleteHealthCareProfessional(mockHealthCareProfessional);
    const docSnapshot1 = await getDoc(
      doc(db, "healthcare_professional", mockHealthCareProfessional.id)
    );
    expect(docSnapshot1.exists()).toBe(false);

    await deleteHospital(mockHospital);
    const docSnapshot2 = await getDoc(doc(db, "hospitals", mockHospital.id));
    expect(docSnapshot2.exists()).toBe(false);

    await deletePatient(mockPatient);
    const docSnapshot3 = await getDoc(doc(db, "patients", mockPatient.id));
    expect(docSnapshot3.exists()).toBe(false);
  });
});
