import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ticketApi } from "src/services/ticketApi";
import { auth } from "src/services/authApi";
import { departmentApi } from "src/services/departmentApi";
import authSlice from "src/features/authSlice";
import ticketSlice from "src/features/ticketSlice";
import insuranceSlice from "src/features/insuranceSlice";
import { insuranceApi } from "src/store/apis";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    ticketReducer: ticketSlice,
    insuranceReducer: insuranceSlice,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [insuranceApi.reducerPath]: insuranceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(insuranceApi.middleware),
});
