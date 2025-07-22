import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './doctorsSlice';
import appointmentsReducer from './appointmentsSlice';

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;