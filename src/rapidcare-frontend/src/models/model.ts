export interface AppState {
    isUserAdmin: boolean;
    isAuthenticated: boolean;
    healthNetworkAdmin: IHealthNetworkAdminState | null;
    healthcareProfessional: IHealthcareProfessionalState | null;
}

export interface IHealthNetworkAdminState {
    id: string;
    name: string;
    email: string;
    healthcareNetwork: {
        name: string;
        totalPatients: number;
        newPatients: number;
        totalHospitals: number;
        hospitals: IHospital[];
    }
}

export interface IHospital {
    id: string;
    name: string;
    address: string;
    healthcareProfessionals?: IHealthcareProfessional[];
    patients?: IPatient[];
}

export interface IHealthcareProfessional {
    id: string;
    name: string;
    email: string;
    phone: string;
    hospital: string;
    department: string;
}

export interface IHealthcareProfessionalState {
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
    patients: IPatient[];
    consultations?: IConsultation[];
}


export interface IConsultation {
    patientName: string;
    photo?: string;
    date: string;
    time: string;
}

export interface IPatient {
    id: string;
    profileInformation?: IProfileInfo;
    medicalHistory?: IMedicalHistory;
    consultationNotes?: ISoapNote[];
    documents?: IDocument[];
}

export interface IProfileInfo {
    demographics?: IDemographics;
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
        phone: string;
        address: string;
    };
};
export interface IDemographics{
    name: string;
    gender: string;
    dateOfBirth: string;
    age: number;
    weight: number;
    height: number;
    maritalStatus: string;
    healthcardNumber?: string;
    occupation?: string
};

export interface IMedicalHistory {
    allergies?: IAllergy[];
    prescriptions?: IPrescription[]
}

export interface IAllergy {
    date: string;
    substance: string;
    symptoms: string;
    status: string;
}
export interface IPrescription {
    date: string;
    medication: string;
    dosage: string;
    status: string;
}
export interface IAppointment {
    date: string;
    reason: string;
    practioner: string;
    notes: string;
}

export interface IDocument {
    documentId: string;
    name: string;
    type: string;
    url: string;
}

export interface ISoapNote {
    id: string;
    date: string;
    practioner: string;
    reasonForVisit: string;
    subjectiveAssesment: {
        symptoms?: string;
        allergies?: string;
        medications?: string;
        medicalHistory?: string;
        lastMeal?: string;

    };
    objectiveAssessment: {
        breathing?: string;
        circulation?: string;
        skinType?: string;
        headToToeCheck?: string;
        levelOfConsciousness?: string;

    };
    summary?: string;
    plan?: string;
}