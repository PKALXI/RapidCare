import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { addHospital, deleteHospital, deletePatient, addAdmin, deleteAdmin, addHealthCareProfessional, deleteHealthCareProfessional, addPatient, getPatient, updatePatient } from '../firebaseControllers/DatabaseOps';
import { mockPatient, mockHealthCareProfessional, mockHospital, mockAdmin, mockPatient2 } from '../mockData/mockData';

describe('DatabaseOps', () => {

    beforeAll(async () => {
        // Add any necessary setup data here if needed
    });

    afterAll(async () => {
        // Clear all collections or specific documents
    });


    //admin

    test('addAdmin should add a valid document', async () => {
        await addAdmin(mockAdmin);
        const docSnapshot = await getDoc(doc(db, 'admin', mockAdmin.id));
        expect(docSnapshot.exists()).toBe(true);
    });

    test('deleteAdmin should delete a existing document', async () => {
        await deleteAdmin(mockHealthCareProfessional);
        const docSnapshot = await getDoc(doc(db, 'admin', mockHealthCareProfessional.id));
        expect(docSnapshot.exists()).toBe(false);
    });

    //hp

    test('addHealthCareProfessional should add a valid document', async () => {
        await addHealthCareProfessional(mockHealthCareProfessional);
        const docSnapshot = await getDoc(doc(db, 'healthcare_professional', mockHealthCareProfessional.id));
        expect(docSnapshot.exists()).toBe(true);
    });

    test('deleteHealthCareProfessional should delete a existing document', async () => {
        await deleteHealthCareProfessional(mockHealthCareProfessional);
        const docSnapshot = await getDoc(doc(db, 'healthcare_professional', mockHealthCareProfessional.id));
        expect(docSnapshot.exists()).toBe(false);
    });

    //hospital

    test('addHospital should add a valid document', async () => {
        await addHospital(mockHospital);
        const docSnapshot = await getDoc(doc(db, 'hospitals', mockHospital.id));
        expect(docSnapshot.exists()).toBe(true);
    });

    test('deleteHospital should delete a existing document', async () => {
        await deleteHospital(mockHospital);
        const docSnapshot = await getDoc(doc(db, 'hospitals', mockHospital.id));
        expect(docSnapshot.exists()).toBe(false);
    });


    //patients

    test('addPatient should add a valid document', async () => {
        await addPatient(mockPatient);
        const docSnapshot = await getDoc(doc(db, 'patients', mockPatient.id));
        expect(docSnapshot.exists()).toBe(true);
    });

    test('Duplicate document should not added', async () => {
        await addPatient(mockPatient);
        await addPatient(mockPatient);

        const patientsCollection = collection(db, 'patients');
        const querySnapshot = await getDocs(patientsCollection);

        const matchingPatients = querySnapshot.docs.filter(doc => doc.id === mockPatient.id);
        expect(matchingPatients.length).toBe(1);
    });

    test('getPatient should retreive a correct existing document', async () => {
        const patient = await getPatient(mockPatient.id);
        expect(patient).toMatchObject(mockPatient);
    });

    test('getPatient should return null for a non-existent document', async () => {
        const patient = await getPatient("1234567");
        expect(patient).toBeNull();
    });

    test('updatePatient should update the correct patient', async () => {
        await updatePatient(mockPatient2);
        const docSnapshot = await getDoc(doc(db, 'patients', mockPatient2.id));
        expect(docSnapshot.data()).toMatchObject(mockPatient2);
    });

    test('deletePatient should delete an existing document', async () => {
        await deletePatient(mockPatient);
        const docSnapshot = await getDoc(doc(db, 'patients', mockPatient.id));
        expect(docSnapshot.exists()).toBe(false);
    });

});