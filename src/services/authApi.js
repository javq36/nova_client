import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080";
const createPostRequest = (url, method = "POST", body) => ({
  url,
  method,
  body,
});

const createPostRequestGoogle = (url, method = "POST", body) => ({
  url,
  method,
  body,
  headers: {
    "Content-Type": "application/json",
  },
});



/* https://www.youtube.com/watch?v=3QLpHlmdW_U
  https://www.youtube.com/watch?v=wNo-MfDt_s0&t=92s
*/

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery(baseURL),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (body) => createPostRequest(`${baseURL}/api/auth/login`, "POST", body),
    }),
    authGoogleLogin: builder.mutation({
      query: (id_token) => createPostRequestGoogle(`${baseURL}/api/auth/google`, "POST", id_token),
    }),
  }),
});

export const { useAuthLoginMutation, useAuthGoogleLoginMutation } =
  auth;
