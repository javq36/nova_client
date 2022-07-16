import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const fotonApi = createApi({

    reducerPath: "foton",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_Backend_URL,
        prepareHeaders: (headers ) => {
            headers.set('Authorization', localStorage.getItem('token') ?? '');
            return headers;
        }
    }),
    tagTypes: ['FOTON'],
    endpoints: (builder) => ({
        getFotonInventory: builder.query({
            query: () => '/foton/Inventario',
            providesTags: ['FOTON'],
        }),
        addInsurance: builder.mutation({
            query: (body) => ({
                url: '/aseguradoras',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FOTON'],
        }),
    }),
});


export const { useGetFotonInventoryQuery, useAddInsuranceMutation } = fotonApi;