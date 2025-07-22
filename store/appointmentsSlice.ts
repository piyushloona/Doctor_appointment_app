import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientNotes: string;
  appointmentDate: string;
  status: 'pending' | 'confirmed' | 'completed';
  time_slot:string;
}


interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
};

console.log(initialState)
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
      // Save to AsyncStorage
      AsyncStorage.setItem('appointments', JSON.stringify(state.appointments)).catch((error) =>
        console.error('Error saving appointment:', error)
      );
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAppointments: (state) => {
      state.appointments = [];
      AsyncStorage.removeItem('appointments').catch((error) =>
        console.error('Error clearing appointments:', error)
      );
    },
  },
});



export const { addAppointment, setAppointments, setLoading, clearAppointments } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;