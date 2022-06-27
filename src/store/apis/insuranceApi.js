import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const insuranceApi = createApi({

    reducerPath: "insurances",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders: (headers ) => {
            headers.set('autorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getInsurances: builder.query({
            query: () => '/aseguradoras',
        }),
        addInsurance: builder.mutation({
            query: (data) => ({
                url: '/aseguradoras',
                method: 'POST',
            }),
        }),
    }),
});


export const { useGetInsurancesQuery } = insuranceApi;