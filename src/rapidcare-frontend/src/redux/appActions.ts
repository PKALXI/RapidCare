import { HealthcareProfessionalState, HealthNetworkAdminState } from "../models/model";


export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const RESET_STATE = "RESET_STATE";

export const resetState = () => ({
    type: RESET_STATE,
});

export const setLoginState = (
    isAuthenticated: boolean,
    isUserAdmin: boolean,
    healthNetworkAdmin: HealthNetworkAdminState | null,
    healthcareProfessional: HealthcareProfessionalState | null
) => ({
    type: SET_INITIAL_STATE,
    payload: {
        isAuthenticated,
        isUserAdmin,
        healthNetworkAdmin,
        healthcareProfessional
    },
});


