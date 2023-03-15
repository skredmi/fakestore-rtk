import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
    }),
    getCategories: build.query({
      query: () => "products/categories"
    })
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productApi;
