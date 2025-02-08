import { AppState } from '../models/model';
import { ADD_DOCUMENT, DELETE_PATIENT, RESET_STATE, SET_INITIAL_STATE, UPDATE_PATIENT_PROFILEINFO } from '../redux/appActions';

const initialState: AppState = {
    isUserAdmin: false,
    isAuthenticated: false,
    healthNetworkAdmin: null,
    healthcareProfessional: null
};

const appReducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
        case SET_INITIAL_STATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                isUserAdmin: action.payload.isUserAdmin,
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
                    ),},
                };
            }
            return state;
        }

        case ADD_DOCUMENT: {
            if (state.healthcareProfessional?.patients) {
                const updatedPatients = state.healthcareProfessional.patients.map(patient => {
                    if (patient.id === action.payload.patientId) {
                        const updatedDocuments = patient.documents ? [...patient.documents, action.payload.document ] : [action.payload.document ];
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

        default: 
            return state;
        
    }
};

export default appReducer;
