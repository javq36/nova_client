import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
/* Slices */
import authSlice from "src/features/authSlice";
import ticketSlice from "src/features/ticketSlice";
import insuranceSlice from "src/features/insuranceSlice";
import fordSlice from "src/features/fordSlice";
import fotonSlice from "src/features/fotonSlice";
import peugeotSlice from "src/features/peugeotSlice";
import bajajSlice from "src/features/bajajSlice";
import fcaSlice from "src/features/fcaSlice";
/* Apis */
import { ticketApi } from "src/services/ticketApi";
import { auth } from "src/services/authApi";
import { departmentApi } from "src/services/departmentApi";
import { insuranceApi } from "src/store/apis";
import { fordApi } from "src/store/apis/fordApi";
import { fotonApi } from "src/store/apis/fotonApi";
import { peugeotApi } from "src/store/apis/peugeotApi";
import { bajajApi } from "src/store/apis/bajajApi";
import { fcaApi } from "src/store/apis/fcaApi";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    ticketReducer: ticketSlice,
    insuranceReducer: insuranceSlice,
    fordReducer: fordSlice,
    fontonReducer: fotonSlice,
    peugeotReducer: peugeotSlice,
    bajajReducer: bajajSlice,
    fcaReducer: fcaSlice,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [insuranceApi.reducerPath]: insuranceApi.reducer,
    [fordApi.reducerPath]: fordApi.reducer,
    [fotonApi.reducerPath]: fotonApi.reducer,
    [peugeotApi.reducerPath]: peugeotApi.reducer,
    [bajajApi.reducerPath]: bajajApi.reducer,
    [fcaApi.reducerPath]: fcaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(insuranceApi.middleware),
});
