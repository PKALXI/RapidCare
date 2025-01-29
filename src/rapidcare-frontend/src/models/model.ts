export interface AppState {
    isUserAdmin: boolean;
    isAuthenticated: boolean;
    healthNetworkAdmin: HealthNetworkAdminState | null;
    healthcareProfessional: HealthcareProfessionalState | null;
}

export interface HealthNetworkAdminState {
    id: string;
    name: string;
    email: string;
    healthcareNetwork: {
        name: string;
        totalPatients: number;
        newPatients: number;
        totalHospitals: number;
        hospitals: Hospital[];
    }
}

export interface Hospital {
    id: string;
    name: string;
    address: string;
    healthcareProfessionals?: HealthcareProfessional[];
    patients?: Patient[];
}

export interface HealthcareProfessional {
    id: string;
    name: string;
    email: string;
    phone: string;
    hospital: string;
    department: string;
}

export interface HealthcareProfessionalState {
    id: string;
    name: string;
    email: string;
    phone: string;
    hospital: string;
    department: string;
    dashboardMetrics?: {
        scheduledVisitsToday: number;
        newPatientsThisMonth: number;
        totalPatients: number;
    };
    patients?: Patient[];
    consultations?: Consultation[];
}


export interface Consultation {
    patientName: string;
    photo?: string;
    date: string;
    time: string;
}

export interface Patient {
    id: string;
    profileInformation?: {
        demographics?: {
            name: string;
            gender: string;
            dateOfBirth: string;
            age: number;
            weight: number;
            height: number;
            maritalStatus: string;
        };

        insuranceInformation?: {
            memberID: string;
            policyNumber: string;
            provider: string;
        };

        contactInformation?: {
            email: string;
            phone: string;
            address: string;
        };
        emergencyContact?: {
            name: string;
            relationship: string;
            number: string;
            address: string;
        };
    };

    medicalHistory?: MedicalHistory;
    consultationNotes?: SoapNote[];
    documents?: {
        documentId: string;
        image: string;
    }[];
}

export interface MedicalHistory {
    allergies?: {
        date: string;
        substance: string;
        sympton: string;
        status: string;
    }[];
    medications?: {
        date: string;
        medication: string;
        dosage: string;
        status: string;
    }[];
    appointments?: {
        date: string;
        reason: string;
        practioner: string;
        notes: string;
    }[];
}


export interface SoapNote {
    id: string;
    date: string;
    subjectiveAssesment?: {
        symptoms?: string;
        allergies?: string;
        medications?: string;
        medicalHistory?: string;
        lastMeal?: string;

    };
    objectiveAssessment?: {
        breathing?: string;
        circulation?: string;
        skinType?: string;
        headToToeCheck?: string;
        levelOfConsciousness?: string;

    };
    summary?: string;
    plan?: string;
}