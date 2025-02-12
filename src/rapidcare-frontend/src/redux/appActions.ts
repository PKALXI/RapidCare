import { IHealthcareProfessionalState, IHealthNetworkAdminState, IProfileInfo, IDocument, INetworkInfo, IHospital, IHealthcareProfessional } from "../models/model";

export const SET_LOGIN_STATE = "SET_LOGIN_STATE";
export const SET_USER_DATA = "SET_USER_DATA";
export const RESET_STATE = "RESET_STATE";
export const UPDATE_PATIENT_PROFILEINFO = "UPDATE_PATIENT_PROFILEINFO";
export const DELETE_PATIENT = "DELETE_PATIENT";
export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const SET_ONBOARDING_STATUS = "SET_ONBOARDING_STATUS";
export const SAVE_NETWORK_INFO = "SAVE_NETWORK_INFO";
export const ADD_HOSPITAL = "ADD_HOSPITAL";
export const UPDATE_HOSPITAL = "UPDATE_HOSPITAL";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_HOSPITAL = "DELETE_HOSPITAL";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const resetState = () => ({
    type: RESET_STATE,
});

export const setLoginState = (
    isUserAdmin: boolean,
    isAuthenticated: boolean,
) => ({
    type: SET_LOGIN_STATE,
    payload: {
        isUserAdmin,
        isAuthenticated,
    },
});

export const setUserData = (user: IHealthcareProfessional) => ({
    type: SET_USER_DATA,
    payload: user

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

export const setOnboardingStatus = (status: boolean) => ({
    type: SET_ONBOARDING_STATUS,
    payload: status,
});

export const saveNetworkInfo = (networkInfo: INetworkInfo) => ({
    type: SAVE_NETWORK_INFO,
    payload: networkInfo,
});

export const addHospital = (hospital: IHospital) => ({
    type: ADD_HOSPITAL,
    payload: hospital,
});

export const updateHospital = (updatedHospital: IHospital) => ({
    type: UPDATE_HOSPITAL,
    payload: updatedHospital,
});

export const addEmployee = (employee: IHealthcareProfessional) => ({
    type: ADD_EMPLOYEE,
    payload: employee,
});

export const updateEmployee = (updatedEmployee: IHealthcareProfessional) => ({
    type: UPDATE_EMPLOYEE,
    payload: updatedEmployee,
});

export const deleteHospital = (hospital: IHospital) => ({
    type: DELETE_HOSPITAL,
    payload: hospital,
});

export const deleteEmployee = (employee: IHealthcareProfessional) => ({
    type: DELETE_EMPLOYEE,
    payload: employee,
});



