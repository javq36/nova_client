import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bajajApi = createApi({

    reducerPath: "bajaj",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_Backend_URL,
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['BAJAJ'],
    endpoints: (builder) => ({
        getBajajInventory: builder.query({
            query: () => '/bajaj/Inventario',
            providesTags: ['BAJAJ'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['BAJAJ'],
        }),
    }),
});


export const { useGetBajajInventoryQuery, useAddInsuranceMutation } = bajajApi;