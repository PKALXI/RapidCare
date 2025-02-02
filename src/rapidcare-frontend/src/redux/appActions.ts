import { IHealthcareProfessionalState, IHealthNetworkAdminState, IPatient, IProfileInfo, IDocument } from "../models/model";

export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const RESET_STATE = "RESET_STATE";
export const UPDATE_PATIENT_PROFILEINFO = "UPDATE_PATIENT_PROFILEINFO";
export const DELETE_PATIENT = "DELETE_PATIENT"
export const ADD_DOCUMENT = "ADD_DOCUMENT"

export const resetState = () => ({
    type: RESET_STATE,
});

export const setLoginState = (
    isAuthenticated: boolean,
    isUserAdmin: boolean,
    healthNetworkAdmin: IHealthNetworkAdminState | null,
    healthcareProfessional: IHealthcareProfessionalState | null
) => ({
    type: SET_INITIAL_STATE,
    payload: {
        isAuthenticated,
        isUserAdmin,
        healthNetworkAdmin,
        healthcareProfessional
    },
});

export const updatePatientProfileInfo = (patientId: string, profileInformation: IProfileInfo) => ({
    type: UPDATE_PATIENT_PROFILEINFO,
    payload: {
        patientId,
        profileInformation
    },
})

export const deletePatient = (patientId: string) => ({
    type: DELETE_PATIENT,
    payload: patientId,
})

export const addDocument = (patientId: String, document: IDocument) => ({
    type: ADD_DOCUMENT,
    payload: {
        patientId,
        document
    }

})


