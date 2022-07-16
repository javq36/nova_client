import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const fordApi = createApi({

    reducerPath: "ford",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_Backend_URL,
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['FORD'],
    endpoints: (builder) => ({
        getFordInventory: builder.query({
            query: () => '/ford/Inventario',
            providesTags: ['FORD'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FORD'],
        }),
    }),
});


export const { useGetFordInventoryQuery, useAddInsuranceMutation } = fordApi;