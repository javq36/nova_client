import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080";
const createRequest = (url) => ({ url });

/* https://www.youtube.com/watch?v=3QLpHlmdW_U */

export const departmentApi = createApi({
  reducerPath: "departamentos",
  baseQuery: fetchBaseQuery(baseURL),
  endpoints: (builder) => ({
    setDepartments: builder.query({
      query: () => createRequest(`${baseURL}/api/departamentos`),
    }),
  }),
});

export const { useSetDepartmentsQuery } =
  departmentApi;
