import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const insuranceApi = createApi({

    reducerPath: "insurances",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['Insurance'],
    endpoints: (builder) => ({
        getInsurances: builder.query({
            query: () => '/aseguradoras',
            providesTags: ['Insurance'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Insurance'],
        }),
    }),
});


export const { useGetInsurancesQuery, useAddInsuranceMutation } = insuranceApi;