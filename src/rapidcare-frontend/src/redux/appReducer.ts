/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Provide app actions for redux layer
 */

// https://react-redux.js.org/introduction/getting-started
import { AppState } from "../models/model";
import {
  ADD_DOCUMENT,
  ADD_EMPLOYEE,
  ADD_HOSPITAL,
  DELETE_EMPLOYEE,
  DELETE_HOSPITAL,
  DELETE_PATIENT,
  RESET_STATE,
  SAVE_NETWORK_INFO,
  SET_LOGIN_STATE,
  SET_ONBOARDING_STATUS,
  UPDATE_EMPLOYEE,
  UPDATE_HOSPITAL,
  UPDATE_PATIENT_PROFILEINFO,
  SET_HP_DATA,
  SET_HN_DATA,
} from "../redux/appActions";
import { mockConsultations, mockDashboardMetrics } from "../mockData/mockData";

// Initial state of the application
const initialState: AppState = {
  isUserAdmin: false, // Indicates if the user is an admin
  isAuthenticated: false, // Indicates if the user is authenticated
  healthNetworkAdmin: null, // Holds the state of the health network admin
  healthcareProfessional: null, // Holds the state of the healthcare professional
};

// Reducer function to handle state changes based on actions
const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    // Handle login state changes
    case SET_LOGIN_STATE:
      return {
        ...state,
        isUserAdmin: action.payload.isUserAdmin, // Update if user is admin
        isAuthenticated: action.payload.isAuthenticated, // Update authentication status
      };

    // Set healthcare professional data
    case SET_HP_DATA:
      return {
        ...state,
        healthcareProfessional: {
          user: action.payload,
          dashboardMetrics: mockDashboardMetrics, 
          patients: [], 
          consultations: mockConsultations, 
        },
      };

    // Set health network admin data
    case SET_HN_DATA:
      return {
        ...state,
        healthNetworkAdmin: {
          isOnboardingComplete: false, 
          networkInfo: action.payload, 
          dashboardMetrics: {
            totalEmployees: 5, 
            totalHospitals: 10, 
          },
          hospitals: [], 
          healthcareProfessionals: [], 
          patients: [],
        },
      };

    // Reset state to initial state
    case RESET_STATE:
      return initialState;

    // Update patient profile information
    case UPDATE_PATIENT_PROFILEINFO: {
      if (state.healthcareProfessional?.patients) {
        const patientIndex = state.healthcareProfessional.patients.findIndex(
          (patient) => patient.id === action.payload.patientId 
        );
        const updatedPatients = [...state.healthcareProfessional.patients]; 
        updatedPatients[patientIndex] = {
          ...updatedPatients[patientIndex],
          profileInformation: action.payload.profileInformation, 
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

    // Delete a patient
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

    // Add a document to a patient's record
    case ADD_DOCUMENT: {
      if (state.healthcareProfessional?.patients) {
        const updatedPatients = state.healthcareProfessional.patients.map(
          (patient) => {
            if (patient.id === action.payload.patientId) {
              const updatedDocuments = patient.documents
                ? [...patient.documents, action.payload.document] 
                : [action.payload.document]; 
              return {
                ...patient,
                documents: updatedDocuments,
              };
            }
            return patient; 
          }
        );
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

    // Set onboarding status for health network admin
    case SET_ONBOARDING_STATUS:
      return {
        ...state,
        healthNetworkAdmin: state.healthNetworkAdmin
          ? {
              ...state.healthNetworkAdmin,
              isOnboardingComplete: action.payload, 
            }
          : null,
      };

    // Save network information for health network admin
    case SAVE_NETWORK_INFO:
      return {
        ...state,
        healthNetworkAdmin: state.healthNetworkAdmin
          ? { ...state.healthNetworkAdmin, networkInfo: action.payload }
          : null,
      };

    // Add a hospital to the health network admin
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
      return state; // Return current state if no health network admin
    }

    // Update a hospital's information
    case UPDATE_HOSPITAL: {
      if (state.healthNetworkAdmin) {
        const updatedHospitals = state.healthNetworkAdmin.hospitals?.map(
          (hospital) =>
            hospital.id === action.payload.id ? action.payload : hospital 
        );
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

    // Add an employee to the health network admin
    case ADD_EMPLOYEE: {
      if (state.healthNetworkAdmin) {
        const updatedEmployees = state.healthNetworkAdmin
          .healthcareProfessionals
          ? [
              ...state.healthNetworkAdmin.healthcareProfessionals,
              action.payload, 
            ]
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

    // Update an employee's information
    case UPDATE_EMPLOYEE: {
      if (state.healthNetworkAdmin) {
        const updatedEmployees =
          state.healthNetworkAdmin.healthcareProfessionals?.map((employee) =>
            employee.id === action.payload.id ? action.payload : employee 
          );
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

    // Delete a hospital from the health network admin
    case DELETE_HOSPITAL: {
      if (state.healthNetworkAdmin) {
        const updatedHospitals = state.healthNetworkAdmin.hospitals?.filter(
          (hospital) =>
            // Change to id for filtering
            hospital.name !== action.payload.name 
        );
        return {
          ...state,
          healthNetworkAdmin: {
            ...state.healthNetworkAdmin,
            hospitals: updatedHospitals, 
          },
        };
      }
      return state; // Return current state if no health network admin
    }

    // Delete an employee from the health network admin
    case DELETE_EMPLOYEE: {
      if (state.healthNetworkAdmin) {
        const updatedEmployees =
          state.healthNetworkAdmin.healthcareProfessionals?.filter(
            (employee) =>
              employee.name !== action.payload.name // Filter out deleted employee
          );
        return {
          ...state,
          healthNetworkAdmin: {
            ...state.healthNetworkAdmin,
            healthcareProfessionals: updatedEmployees, // Update healthcare professionals array
          },
        };
      }
      return state;
    }

    // Return current state for unrecognized action
    default:
      return state; 
  }
};

// Export the reducer
export default appReducer; 
