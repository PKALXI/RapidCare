import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    isAuthenticated: boolean;
    isUserAdmin: boolean;
    healthNetworkAdmin: boolean;
    healthcareProfessional: any;
}

const initialState: AppState = {
    isAuthenticated: false,
    isUserAdmin: false,
    healthNetworkAdmin: false,
    healthcareProfessional: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoginState: (
            state,
            action: PayloadAction<{
                isAuthenticated: boolean;
                isUserAdmin: boolean;
                healthNetworkAdmin: boolean;
                healthcareProfessional: any;
            }>
        ) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isUserAdmin = action.payload.isUserAdmin;
            state.healthNetworkAdmin = action.payload.healthNetworkAdmin;
            state.healthcareProfessional = action.payload.healthcareProfessional;
        },
    },
});

export const { setLoginState } = appSlice.actions;
export default appSlice.reducer;
