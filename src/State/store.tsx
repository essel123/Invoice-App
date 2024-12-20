import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../State/stateSlice';

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;