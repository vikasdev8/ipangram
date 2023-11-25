import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApis = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query:(body)=>({
        url:"user/signup",
        body,
        method:"post"
      }),
    })
  }),
})

export const {useRegisterMutation} = authApis;