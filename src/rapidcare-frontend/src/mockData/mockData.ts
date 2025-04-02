/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: This is the mock data for the application to test the application flows without the backend
 */

import { INetworkInfo } from "../models/model";


export const mockDashboardMetrics = {
  scheduledVisitsToday: 5,
  newPatientsThisMonth: 20,
  totalPatients: 150,
};


export const mockConsultations = [
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
];

export const mockHospital = {
  id: "hosp123",
  name: "City General Hospital",
  address: "123 Main St, Springfield",
  email: "info@citygeneralhospital.com",
  phone: "555-0000",
  bedCapacity: 100,
  operatingHours: "24/7",
};

export const mockAdmin: INetworkInfo = {
  id: "admin123",
  networkName: "Health Network",
  typeOfNetwork: "Public",
  mainContact: "John Doe",
  email: "john.doe@healthnetwork.com",
  phone: "555-1111",
  website: "http://healthnetwork.com",
  address: "456 Health St, Springfield",
};

export const mockHealthCareProfessional = {
  id: "hp123",
  name: "Dr. Jane Smith",
  role: "Doctor",
  hospital: "City General Hospital",
  department: "Cardiology",
  email: "janesmith@hospital.com",
  phone: "555-1234",
  employmentStatus: "Active",
};

export const mockPatient = {
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
  },
};


export const mockPatient2 = {
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
};
