import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  tagTypes: ['Customer'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // If you need to add headers, do it here
      return headers;
    }
  }),

  endpoints: (builder) => ({
    
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/registercustomer',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/logincustomer',
        method: 'POST',
        body: credentials,
      }),
      providesTags:['Customer']
    }),

    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags:['Customer']
    }),

    //get customer orders
    getOrders: builder.query({
      query: (data) => ({
        url: '/orders/customer',
        method: 'GET',
      }),
    }),

    getPaginatedOrders: builder.query({
      query: (data) => ({
        url: `/orders/customer/paginated?page=${data.page}&limit=${data.limit}`,
        method: 'GET',
      }),
    }),

    editCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer',
        method: 'POST',
        body:data
      }),
      invalidatesTags:['Customer']
    }),
    




  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useGetOrdersQuery,
  useGetPaginatedOrdersQuery,
  useEditCustomerMutation
} = customerApi;