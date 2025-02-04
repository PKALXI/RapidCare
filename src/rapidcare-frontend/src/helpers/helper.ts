import { IHealthcareProfessionalState, IHealthNetworkAdminState } from "../models/model";

export const validateField = (field: string, value: string | number): string => {
    let errorMessage = '';

    switch (field) {
        case 'email':
            if (typeof value === 'string') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Invalid email format';
                }
            }
            break;

        case 'phone':
            if (typeof value === 'string') {
                const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Invalid phone number format';
                }
            }
            break;

        case 'dateOfBirth':
            if (typeof value === 'string') {
                const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dobRegex.test(value)) {
                    errorMessage = 'Invalid date format (YYYY-MM-DD)';
                }
            }
            break;

        case 'age':
        case 'weight':
        case 'height':
            const numericValue = Number(value); 
            if (isNaN(numericValue) || numericValue <= 0) {
                errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number`;
            }
            break;

        default:
            break;
    }

    return errorMessage;
};




export const mapHealthcareProfessionalData = (data: any): IHealthcareProfessionalState => ({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    hospital: data.hospital,
    department: data.department,
    dashboardMetrics: data.dashboardMetrics ? {
        scheduledVisitsToday: Number(data.dashboardMetrics.scheduledVisitsToday) || 0,
        newPatientsThisMonth: Number(data.dashboardMetrics.newPatientsThisMonth) || 0,
        totalPatients: Number(data.dashboardMetrics.totalPatients) || 0
    } : undefined,
    patients: data.patients ? data.patients.map((patient: any) => ({
        id: patient.id,
        profileInformation: patient.profileInformation ? {
            demographics: patient.profileInformation.demographics ? {
                ...patient.profileInformation.demographics,
                age: Number(patient.profileInformation.demographics.age) || null,
                weight: Number(patient.profileInformation.demographics.weight) || null,
                height: Number(patient.profileInformation.demographics.height) || null
            } : undefined,
            insuranceInformation: patient.profileInformation.insuranceInformation || undefined,
            contactInformation: patient.profileInformation.contactInformation || undefined,
            emergencyContact: patient.profileInformation.emergencyContact || undefined
        } : undefined,
        medicalHistory: patient.medicalHistory || undefined,
        consultationNotes: patient.consultationNotes || undefined,
        documents: patient.documents || undefined
    })) : [],
    consultations: data.consultations ? data.consultations.map((consultation: any) => ({
        patientName: consultation.patientName,
        photo: consultation.photo || undefined,
        date: consultation.date,
        time: consultation.time
    })) : []
});

export const mapHealthNetworkAdminData = (data: any): IHealthNetworkAdminState => ({
    id: data.id,
    name: data.name,
    email: data.email,
    healthcareNetwork: {
        name: data.healthcareNetwork.name,
        totalPatients: Number(data.healthcareNetwork.totalPatients) || 0,
        newPatients: Number(data.healthcareNetwork.newPatients) || 0,
        totalHospitals: Number(data.healthcareNetwork.totalHospitals) || 0,
        hospitals: data.healthcareNetwork.hospitals ? data.healthcareNetwork.hospitals.map((hospital: any) => ({
            id: hospital.id,
            name: hospital.name,
            address: hospital.address,
            healthcareProfessionals: hospital.healthcareProfessionals ? hospital.healthcareProfessionals.map((prof: any) => ({
                id: prof.id,
                name: prof.name,
                email: prof.email,
                phone: prof.phone,
                hospital: prof.hospital,
                department: prof.department
            })) : undefined,
            patients: hospital.patients ? hospital.patients.map((patient: any) => ({
                id: patient.id,
                profileInformation: patient.profileInformation ? {
                    demographics: patient.profileInformation.demographics ? {
                        ...patient.profileInformation.demographics,
                        age: Number(patient.profileInformation.demographics.age) || null,
                        weight: Number(patient.profileInformation.demographics.weight) || null,
                        height: Number(patient.profileInformation.demographics.height) || null
                    } : undefined,
                    insuranceInformation: patient.profileInformation.insuranceInformation || undefined,
                    contactInformation: patient.profileInformation.contactInformation || undefined,
                    emergencyContact: patient.profileInformation.emergencyContact || undefined
                } : undefined,
                medicalHistory: patient.medicalHistory || undefined,
                consultationNotes: patient.consultationNotes || undefined,
                documents: patient.documents || undefined
            })) : undefined
        })) : []
    }
});
