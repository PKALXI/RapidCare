import { AppState } from "../models/model";

export function generateHealthcareProfessionalMockData(): AppState {
    return {
        isAuthenticated: true,
        isUserAdmin: false,
        healthNetworkAdmin: null,
        healthcareProfessional: {
            id: "hp123",
            name: "Dr. Jane Smith",
            email: "janesmith@hospital.com",
            phone: "555-1234",
            hospital: "City General Hospital",
            department: "Cardiology",
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
                            number: "555-8765",
                            address: "123 Elm Street, Springfield",
                        },
                    },
                    medicalHistory: {
                        allergies: [
                            {
                                date: "2023-01-10",
                                substance: "Peanuts",
                                sympton: "Hives and swelling",
                                status: "Active",
                            },
                        ],
                        medications: [
                            {
                                date: "2023-05-12",
                                medication: "Aspirin",
                                dosage: "100mg daily",
                                status: "Ongoing",
                            },
                        ],
                        appointments: [
                            {
                                date: "2023-10-15",
                                reason: "Routine Checkup",
                                practioner: "Dr. Jane Smith",
                                notes: "Patient is in good health. Continue medication as prescribed.",
                            },
                        ],
                    },
                    consultationNotes: [],
                    documents: [
                        {
                            documentId: "doc1",
                            image: "document1.jpg",
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
                            number: "555-6789",
                            address: "789 Pine Road, Shelbyville",
                        },
                    },
                    medicalHistory: {
                        allergies: [
                            {
                                date: "2022-11-05",
                                substance: "Penicillin",
                                sympton: "Rash",
                                status: "Resolved",
                            },
                        ],
                        medications: [
                            {
                                date: "2023-03-22",
                                medication: "Metformin",
                                dosage: "500mg twice daily",
                                status: "Ongoing",
                            },
                        ],
                        appointments: [
                            {
                                date: "2023-09-10",
                                reason: "Follow-up",
                                practioner: "Dr. Jane Smith",
                                notes: "Blood sugar levels improving. Continue prescribed treatment.",
                            },
                        ],
                    },
                    consultationNotes: [],
                    documents: [
                        {
                            documentId: "doc2",
                            image: "document2.jpg",
                        },
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
    }
};
