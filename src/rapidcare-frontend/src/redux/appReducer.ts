import { AppState } from '../models/model';
import { RESET_STATE, SET_INITIAL_STATE } from '../redux/appActions';


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


        default:
            return state;
    }
};

export default appReducer;
