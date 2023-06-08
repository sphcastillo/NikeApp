// - /query/react allows you to generate hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  
  endpoints: (builder) => ({
    getProducts: builder.query({
      // attaches /products to our baseURL
      query: () => 'products',
    }),
    getProduct: builder.query({
      // attaches /products/... 
      query: (id) => `products/${id}`,
    }),
  }),
});

// Export hooks for usuage in functional components, which are
// auto-generared nased on the defined endpoints
export const { useGetProductQuery, useGetProductsQuery } = apiSlice;