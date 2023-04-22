import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICart, Category } from "../../types/Cart.types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (build) => ({
    getProducts: build.query<ICart[], null>({
      query: () => "products",
    }),
    getCategories: build.query<Category[], null>({
      query: () => "products/categories",
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productApi;
