import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./product/productApi";
import cartReducer from "./cart/cartSlice";
import filterReducer from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch