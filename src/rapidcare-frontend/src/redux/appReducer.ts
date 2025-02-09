import { generateHealthcareProfessionalMockData } from '../mockData/mockData';
import { AppState } from '../models/model';
import { ADD_DOCUMENT, ADD_EMPLOYEE, ADD_HOSPITAL, DELETE_EMPLOYEE, DELETE_HOSPITAL, DELETE_PATIENT, RESET_STATE, SAVE_NETWORK_INFO, SET_INITIAL_STATE, SET_ONBOARDING_STATUS, UPDATE_EMPLOYEE, UPDATE_HOSPITAL, UPDATE_PATIENT_PROFILEINFO } from '../redux/appActions';

// const initialState: AppState = {
//     isUserAdmin: false,
//     isAuthenticated: false,
//     healthNetworkAdmin: null,
//     healthcareProfessional: null
// };

//MOCK DATA CALL TO BE REMOVED
const initialState = generateHealthcareProfessionalMockData();

const appReducer = (state = initialState, action: any): AppState => {

    switch (action.type) {
        case SET_INITIAL_STATE:
            return {
                ...state,
                isUserAdmin: action.payload.isUserAdmin,
                isAuthenticated: action.payload.isAuthenticated,
                healthNetworkAdmin: action.payload.healthNetworkAdmin,
                healthcareProfessional: action.payload.healthcareProfessional,
            };

        case RESET_STATE:
            return initialState;

        case UPDATE_PATIENT_PROFILEINFO: {
            if (state.healthcareProfessional?.patients) {
                const patientIndex = state.healthcareProfessional.patients.findIndex(patient => patient.id === action.payload.patientId);
                const updatedPatients = [...state.healthcareProfessional.patients];
                updatedPatients[patientIndex] = {
                    ...updatedPatients[patientIndex],
                    profileInformation: action.payload.profileInformation
                };
                return {
                    ...state,
                    healthcareProfessional: {
                        ...state.healthcareProfessional,
                        patients: updatedPatients,
                    },
                };
            }
            return state;
        }

        case DELETE_PATIENT: {
            if (state.healthcareProfessional?.patients) {
                return {
                    ...state,
                    healthcareProfessional: {
                        ...state.healthcareProfessional,
                        patients: state.healthcareProfessional.patients.filter(
                            (patient) => patient.id !== action.payload
                        ),
                    },
                };
            }
            return state;
        }

        case ADD_DOCUMENT: {
            if (state.healthcareProfessional?.patients) {
                const updatedPatients = state.healthcareProfessional.patients.map(patient => {
                    if (patient.id === action.payload.patientId) {
                        const updatedDocuments = patient.documents ? [...patient.documents, action.payload.document] : [action.payload.document];
                        return {
                            ...patient,
                            documents: updatedDocuments
                        };
                    }
                    return patient;
                });
                return {
                    ...state,
                    healthcareProfessional: {
                        ...state.healthcareProfessional,
                        patients: updatedPatients,
                    },
                };
            }
            return state;
        }

        case SET_ONBOARDING_STATUS:
            return {
                ...state,
                healthNetworkAdmin: state.healthNetworkAdmin
                    ? { ...state.healthNetworkAdmin, isOnboardingComplete: action.payload }
                    : null,
            };


        case SAVE_NETWORK_INFO:
            return {
                ...state,
                healthNetworkAdmin: state.healthNetworkAdmin
                    ? { ...state.healthNetworkAdmin, networkInfo: action.payload }
                    : null,
            };

            case ADD_HOSPITAL: {
                if (state.healthNetworkAdmin) {
                    const updatedHospitals = state.healthNetworkAdmin.hospitals
                    ? [...state.healthNetworkAdmin.hospitals, action.payload]
                    : [action.payload]; 
    
                    return {
                        ...state,
                        healthNetworkAdmin: {
                            ...state.healthNetworkAdmin,
                            hospitals: updatedHospitals, 
                        },
                    };
                }
                return state;  
            }

            case UPDATE_HOSPITAL: {
                if (state.healthNetworkAdmin) {
                    const updatedHospitals = state.healthNetworkAdmin.hospitals?.map(hospital =>
                        hospital.id === action.payload.id ? action.payload : hospital
                    );
                    return {
                        ...state,
                        healthNetworkAdmin: { 
                            ...state.healthNetworkAdmin, 
                            hospitals: updatedHospitals 
                        },
                    };
                }
                return state;
            }

            case ADD_EMPLOYEE: {
                if (state.healthNetworkAdmin) {
                    const updatedEmployees = state.healthNetworkAdmin.healthcareProfessionals
                    ? [...state.healthNetworkAdmin.healthcareProfessionals, action.payload]
                    : [action.payload]; 
    
                    return {
                        ...state,
                        healthNetworkAdmin: {
                            ...state.healthNetworkAdmin,
                            healthcareProfessionals: updatedEmployees, 
                        },
                    };
                }
                return state;  
            }

            case UPDATE_EMPLOYEE: {
                if (state.healthNetworkAdmin) {
                    const updatedEmployees = state.healthNetworkAdmin.healthcareProfessionals?.map(employee =>
                        employee.id === action.payload.id ? action.payload : employee
                    );
                    return {
                        ...state,
                        healthNetworkAdmin: { 
                            ...state.healthNetworkAdmin, 
                            healthcareProfessionals: updatedEmployees 
                        },
                    };
                }
                return state;
            }

            case DELETE_HOSPITAL: {
                if (state.healthNetworkAdmin) {
                    const updatedHospitals = state.healthNetworkAdmin.hospitals?.filter(hospital =>
                        //change to id
                        hospital.name !== action.payload.name
                    );
                    return {
                        ...state,
                        healthNetworkAdmin: { 
                            ...state.healthNetworkAdmin, 
                            hospitals: updatedHospitals 
                        },
                    };
                }
                return state;
            }

            case DELETE_EMPLOYEE: {
                if (state.healthNetworkAdmin) {
                    const updatedEmployees = state.healthNetworkAdmin.healthcareProfessionals?.filter(employee =>
                        //change to id
                        employee.name !== action.payload.name
                    );
                    return {
                        ...state,
                        healthNetworkAdmin: { 
                            ...state.healthNetworkAdmin, 
                            healthcareProfessionals: updatedEmployees 
                        },
                    };
                }
                return state;
            }

        default:
            return state;

    }
};

export default appReducer;
