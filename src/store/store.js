import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./product/productApi";
import cartReducer from "./cart/cartSlice"

export const store = configureStore({
  reducer: { cart: cartReducer, [productApi.reducerPath]: productApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
