import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import { generateHealthcareProfessionalMockData } from '../mockData/mockData';

const store = configureStore({
    reducer: {
        app: appReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;