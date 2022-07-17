import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const fcaApi = createApi({

    reducerPath: "fca",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_Backend_URL,
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['FCA'],
    endpoints: (builder) => ({
        getFCAInventory: builder.query({
            query: () => '/fca/Inventario',
            providesTags: ['FCA'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FCA'],
        }),
    }),
});


export const { useGetFCAInventoryQuery, useAddInsuranceMutation } = fcaApi;