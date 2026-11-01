import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
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
      invalidatesTags: ['Order']
    }),

    getOrders: builder.query({
      query: (data) => {
        const { page = 1, limit = 20, search = '' } = data || {};
        let url = `/orders?page=${page}&limit=${limit}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Order']
    }),

    getSingleOrder: builder.query({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'GET',
      }),
      providesTags: ['Order']
    }),

    editOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Order']
    }),

    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Order']
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetOrdersQuery, 
  useGetSingleOrderQuery, 
  useEditOrderMutation, 
  useDeleteOrderMutation 
} = orderApi;