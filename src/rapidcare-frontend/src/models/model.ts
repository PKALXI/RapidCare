export interface AppState {
    isUserAdmin: boolean;
    isAuthenticated: boolean;
    healthNetworkAdmin: IHealthNetworkAdminState | null;
    healthcareProfessional: IHealthcareProfessionalState | null;
}

export interface IHealthNetworkAdminState {
    user: {
        id: string;
        name: string; 
        email: string;
    }
    isOnboardingComplete: boolean;
    networkInfo?: INetworkInfo;
    dashboardMetrics?: {
        totalEmployees: number;
        totalHospitals: number;
    }
    hospitals?: IHospital[];
    healthcareProfessionals?: IHealthcareProfessional[];
    patients?: IPatient[];
}

export interface INetworkInfo {
    id : string,
    networkName: string;
    typeOfNetwork: "Public" | "Private" | "Non-Profit";
    mainContact: string;
    email: string;
    phone: string;
    website: string;
    address: string;
}

export interface IHospital {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    bedCapacity?: number;
    operatingHours?: string;
}

export interface IHealthcareProfessional {
    id: string;
    name: string;
    role: string;
    hospital: string;
    department: string;
    email: string;
    phone: string;
    employmentStatus: string;   
}

export interface IHealthcareProfessionalState {
    user: IHealthcareProfessional
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
    medicalHistory?: string;
    familyHistory?: string; 
    allergies?: string;
    medications?: string;   
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
    subjective: {
        reason: string;
        hpi: string;
        medicalHistory?: string;
        symptoms?: string;
        allergies?: string;
        currentMedications?: string;
    };
    objective: {
        vitals: string;
        physicalExam: string;
        laboratoryData: string;
        imagingResults: string;
        otherData: string;
    };
    assessment: {
        problems: string;
        diagnosis: string;
    }
    plan: string;
    followUp: string;
}