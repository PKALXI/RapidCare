import { AppState } from "../models/model";

export const generateHealthcareProfessionalMockData = (): AppState => ({
    isAuthenticated: true,
    isUserAdmin: true,
    healthNetworkAdmin: null,
    healthcareProfessional: {
        user:{
            id: "hp123",
            name: "Dr. Jane Smith",
            role: "Doctor",
            hospital: "City General Hospital",
            department: "Cardiology",
            email: "janesmith@hospital.com",
            phone: "555-1234",
            employmentStatus: "Active"
        },
        dashboardMetrics: {
            scheduledVisitsToday: 5,
            newPatientsThisMonth: 20,
            totalPatients: 150,
        },
        patients: [
            {
                id: "12345",
                profileInformation: {
                    demographics: {
                        name: "Anushka Sharma",
                        gender: "Female",
                        dateOfBirth: "1985-04-12",
                        age: 38,
                        weight: 70,
                        height: 165,
                        maritalStatus: "Married",
                    },
                    insuranceInformation: {
                        memberID: "M123456",
                        policyNumber: "P987654",
                        provider: "HealthCare Plus",
                    },
                    contactInformation: {
                        email: "alice.johnson@example.com",
                        phone: "555-5678",
                        address: "123 Elm Street, Springfield",
                    },
                    emergencyContact: {
                        name: "John Johnson",
                        relationship: "Husband",
                        phone: "555-8765",
                        address: "123 Elm Street, Springfield",
                    },
                },
                //medical history
                consultationNotes: [],
                documents: [
                    {
                        documentId: "1738391167785",
                        name: "A1.pdf",
                        type:"application/pdf",
                        url:"blob:http://localhost:3000/87d57e46-1356-44a5-9315-eb9dfde6ae13"
                    },
                    {
                        documentId: "1738391167785",
                        name: "A1.pdf",
                        type:"application/pdf",
                        url:"blob:http://localhost:3000/87d57e46-1356-44a5-9315-eb9dfde6ae13"
                    },
                    
                ],
            },
            {
                id: "12346",
                profileInformation: {
                    demographics: {
                        name: "Virat Kohli",
                        gender: "Male",
                        dateOfBirth: "1970-07-22",
                        age: 36,
                        weight: 85,
                        height: 175,
                        maritalStatus: "Single",
                    },
                    insuranceInformation: {
                        memberID: "M654321",
                        policyNumber: "P123456",
                        provider: "CareWell Insurance",
                    },
                    contactInformation: {
                        email: "bob.williams@example.com",
                        phone: "555-9876",
                        address: "456 Oak Avenue, Shelbyville",
                    },
                    emergencyContact: {
                        name: "Alice Williams",
                        relationship: "Sister",
                        phone: "555-6789",
                        address: "789 Pine Road, Shelbyville",
                    },
                },
                //medical history
                consultationNotes: [],
                documents: [
                    {
                        documentId: "1738391167785",
                        name: "A1.pdf",
                        type:"application/pdf",
                        url:"blob:http://localhost:3000/87d57e46-1356-44a5-9315-eb9dfde6ae13"
                    },{
                        documentId: "1738391167785",
                        name: "A1.pdf",
                        type:"application/pdf",
                        url:"blob:http://localhost:3000/87d57e46-1356-44a5-9315-eb9dfde6ae13"
                    },
                    {
                        documentId: "1738391167785",
                        name: "A1.pdf",
                        type:"application/pdf",
                        url:"blob:http://localhost:3000/87d57e46-1356-44a5-9315-eb9dfde6ae13"
                    }
                ],
            },
        ],
        consultations: [
            {
                patientName: "Anushka Sharma",
                date: "2024-01-01",
                time: "10:00 AM",
            },
            {
                patientName: "Virat Kohli",
                date: "2024-01-02",
                time: "11:00 AM",
            },
        ],
    }
});


export const generateSignupStateData = () => ({
    isUserAdmin: true,
    isAuthenticated: true,
    healthNetworkAdmin: {
        user: {
            id: "001",
            name: "John Doe",
            email: "johndoe@example.com",
        },
        isOnboardingComplete: false
    },
    healthcareProfessional: null,
});