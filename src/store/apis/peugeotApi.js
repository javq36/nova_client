import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const peugeotApi = createApi({

    reducerPath: "peugeot",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_Backend_URL,
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['PEUGEOT'],
    endpoints: (builder) => ({
        getPugeotInventory: builder.query({
            query: () => '/peugeot/Inventario',
            providesTags: ['PEUGEOT'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PEUGEOT'],
        }),
    }),
});


export const { useGetPugeotInventoryQuery, useAddInsuranceMutation } = peugeotApi;