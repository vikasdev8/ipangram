import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApis = createApi({
  reducerPath: 'Ipangram',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes:["employeeGet"],
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query:(body)=>({
        url:"employee",
        body,
        method:"post"
      }),
      invalidatesTags:["employeeGet"]
    }),
    getAllEmployees: builder.query({
      query:(url)=>{
        console.log("url",url)
        return{
          url:`employee${url}`,
          method:"get"
        }
      },
      providesTags:['employeeGet']
    }),
    updateEmployee: builder.mutation({
      query:(body)=>{
        return{
          url:`employee`,
          body,
          method:"put"
        }
      },
      invalidatesTags:['employeeGet']
    }),
    deleteEmployee: builder.mutation({
      query:(url)=>{
        return{
          url:`employee${url}`,
          method:"delete"
        }
      },
      invalidatesTags:['employeeGet']
    }),
    
  }),
})

export const {useCreateEmployeeMutation,useGetAllEmployeesQuery,useUpdateEmployeeMutation,useDeleteEmployeeMutation} = authApis;