import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../types/Cart.types";

const initialState:ICart[] = [];

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action:PayloadAction<ICart[]>) => {
      return [...action.payload]
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
