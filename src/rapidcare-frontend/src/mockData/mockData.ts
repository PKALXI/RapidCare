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
                            phone: "555-8765",
                            address: "123 Elm Street, Springfield",
                        },
                    },
                    medicalHistory: {
                        allergies: [
                            {
                                date: "2023-01-10",
                                substance: "Peanuts",
                                symptoms: "Hives and swelling",
                                status: "Active",
                            },
                            {
                                date: "2023-01-10",
                                substance: "Peanuts",
                                symptoms: "Hives and swelling",
                                status: "Active",
                            },
                            {
                                date: "2023-01-10",
                                substance: "Peanuts",
                                symptoms: "Hives and swelling",
                                status: "Active",
                            }
                            
                        ],
                        prescriptions: [
                            {
                                date: "2023-05-12",
                                medication: "Aspirin",
                                dosage: "100mg daily",
                                status: "Ongoing",
                            },
                            {
                                date: "2023-05-12",
                                medication: "Aspirin",
                                dosage: "100mg daily",
                                status: "Ongoing",
                            }
                        ],
                    },
                    consultationNotes: [
                        {
                            id: "1",
                            date: "2024-01-15",
                            practioner: "Dr. Emily Carter",
                            reasonForVisit: "Routine Checkup",
                            subjectiveAssesment: {
                                symptoms: "None",
                                allergies: "N/A",
                                medications: "Multivitamins",
                                medicalHistory: "No prior conditions",
                                lastMeal: "Breakfast",
                            },
                            objectiveAssessment: {
                                breathing: "Normal",
                                circulation: "Stable",
                                skinType: "Healthy",
                                headToToeCheck: "No abnormalities",
                                levelOfConsciousness: "Alert",
                            },
                            summary: "Patient is in good health.",
                            plan: "Continue regular exercise and healthy diet.",
                        },
                        {
                            id: "2",
                            date: "2024-02-10",
                            practioner: "Dr. Alex Smith",
                            reasonForVisit: "Back Pain",
                            subjectiveAssesment: {
                                symptoms: "Lower back pain",
                                allergies: "None",
                                medications: "Ibuprofen",
                                medicalHistory: "No chronic issues",
                                lastMeal: "Lunch",
                            },
                            objectiveAssessment: {
                                breathing: "Normal",
                                circulation: "Stable",
                                skinType: "Normal",
                                headToToeCheck: "Mild tenderness in lower back",
                                levelOfConsciousness: "Alert",
                            },
                            summary: "Likely muscular strain.",
                            plan: "Prescribed pain relievers, recommended physiotherapy.",
                        },
                        {
                            id: "3",
                            date: "2024-03-05",
                            practioner: "Dr. Sophia Lee",
                            reasonForVisit: "Allergy Symptoms",
                            subjectiveAssesment: {
                                symptoms: "Runny nose, sneezing",
                            
                                
                                medicalHistory: "Mild seasonal allergies Mild seasonal allergies Mild seasonal allergies Mild seasonal allergies Mild seasonal allergies Mild seasonal allergiesMild seasonal allergies Mild seasonal allergiesMild seasonal allergies",
                                lastMeal: "Dinner",
                            },
                            objectiveAssessment: {
                                breathing: "Slight congestion",
                                circulation: "Stable",
                                skinType: "No rashes",
                                headToToeCheck: "Mild nasal congestion",
                                levelOfConsciousness: "Alert",
                            },
                            summary: "Seasonal allergies affecting patient.",
                            plan: "Increase antihistamines, avoid exposure to dust.",
                        },
                    ],
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
                    medicalHistory: {
                        allergies: [
                            {
                                date: "2022-11-05",
                                substance: "Penicillin",
                                symptoms: "Rash",
                                status: "Resolved",
                            },
                        ],
                        prescriptions: [
                            {
                                date: "2023-03-22",
                                medication: "Metformin",
                                dosage: "500mg twice daily",
                                status: "Ongoing",
                            },
                        ],
                    },
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
    }
};
