import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ticketApi } from "src/services/ticketApi";
import { auth } from "src/services/authApi";
import { departmentApi } from "src/services/departmentApi";
import authSlice from "src/features/authSlice";
import ticketSlice from "src/features/ticketSlice";
import insuranceSlice from "src/features/insuranceSlice";
import { insuranceApi } from "src/store/apis";
import { fordApi } from "src/store/apis/fordApi";
import { fotonApi } from "src/store/apis/fotonApi";
import fordSlice from "src/features/fordSlice";
import fotonSlice from "src/features/fotonSlice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    ticketReducer: ticketSlice,
    insuranceReducer: insuranceSlice,
    fordReducer: fordSlice,
    fontonReducer: fotonSlice,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [insuranceApi.reducerPath]: insuranceApi.reducer,
    [fordApi.reducerPath]: fordApi.reducer,
    [fotonApi.reducerPath]: fotonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(insuranceApi.middleware),
});
