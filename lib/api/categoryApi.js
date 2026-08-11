import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // If you need to add headers, do it here
      return headers;
    }
  }),
  endpoints: (builder) => ({
    
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Category']
    }),

    getCategories: builder.query({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags:['Category']
    }),



    editCategory: builder.mutation({
      query: (data) => ({
        url: `/category/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags:['Category']
    }),



    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/category/`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags:['Category']
    }),



    getCategoryById: builder.query({
      query: (data) => ({
        url: `/category/${data.catId}`,
        method: 'GET',
      }),
      providesTags:['Category']
    }),

    
    
    
  }),
});

export const {useCreateCategoryMutation, useEditCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation, useGetCategoryByIdQuery} = categoryApi;