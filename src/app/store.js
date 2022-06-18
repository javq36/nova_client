import { configureStore } from '@reduxjs/toolkit'
import { ticketApi } from "src/services/ticketApi";
import { auth } from "src/services/authApi";
import { departmentApi } from "src/services/departmentApi";
import  authSlice  from "src/features/authSlice";
import ticketSlice  from "src/features/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ticketReducer: ticketSlice,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
})