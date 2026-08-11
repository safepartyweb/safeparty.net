import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // If you need to add headers, do it here
      return headers;
    }
  }),
  endpoints: (builder) => ({
    
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Product']
    }),

    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags:['Product']
    }),

    getSingleProduct: builder.query({
      query: (data) => ({
        url: `/products/${data.productId}`,
        method: 'GET',
      }),
      providesTags:['Product']
    }),

    getProductBySlug: builder.query({
      query: (data) => ({
        url: `/products/single/${data.slug}`,
        method: 'GET',
      }),
      providesTags:['Product']
    }),

    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `/products/`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags:['Product']
    }),

    
    
    
  }),
});

export const {useCreateProductMutation, useGetProductsQuery, useGetSingleProductQuery, useGetProductBySlugQuery, useDeleteProductMutation} = productApi;