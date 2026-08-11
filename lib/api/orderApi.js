import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // If you need to add headers, do it here
      return headers;
    }
  }),

  endpoints: (builder) => ({
    
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Order']
    }),

    //get orders for admin
    getOrders: builder.query({
      query: (data) => ({
        url: `/orders?page=${data.page}&limit=${data.limit}`,
        method: 'GET',
      }),
      providesTags:['Order']
    }),

    getSingleOrder: builder.query({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'GET',
      }),
      providesTags:['Order']
    }),


    editOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags:['Order']
    }),

    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags:['Order']
    }),

    
    
    
  }),
});

export const {useCreateOrderMutation, useGetOrdersQuery, useGetSingleOrderQuery, useEditOrderMutation, useDeleteOrderMutation } = orderApi;