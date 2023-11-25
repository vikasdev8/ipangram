import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApis = createApi({
  reducerPath: 'Ipangram',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query:(body)=>({
        url:"employee",
        body,
        method:"post"
      }),
    })
  }),
})

export const {useCreateEmployeeMutation} = authApis;