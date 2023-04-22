import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../types/Cart.types";

const initialState:ICart[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action:PayloadAction<ICart>) => {
      state.push(action.payload);
    },

    removeItem: (state, action:PayloadAction<{ id: number }>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
