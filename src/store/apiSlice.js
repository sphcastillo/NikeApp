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
    //mutation is for POST request - to update some data
    createOrder: builder.mutation({
      // newOrder - receiving as a parameter from our shoppingCartScreen component
      query: (newOrder) => ({
        url: 'orders',
        method: "POST",
        body: newOrder,
      })
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
    // Payments - POST request
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
      }), 
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generared based on the defined endpoints
export const { 
  useGetProductQuery, 
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useCreatePaymentIntentMutation
} = apiSlice;