import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Personal'],
    endpoints: (builder) => ({
        getCarrecs: builder.query({
            query: () => 'carrecs',
        }),
    }),
})

export const { useGetCarrecsQuery } = apiSlice;
