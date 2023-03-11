import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { IIngredient, IResponse } from "../utils/types";

interface BurgerIngredientsState {
  request: boolean;
  error: boolean;
  ingredients: IIngredient[];
}

const initialState: BurgerIngredientsState = {
  request: false,
  error: false,
  ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        console.error(action.error.message);
        
        state.request = false;
        state.error = true;
      });
  },
});

export const getIngredients = createAsyncThunk<IResponse & { data: IIngredient[] }>(
  "burgerIngredients/getIngredientIngredientTypes", 
  async () => {
    const fetchApi = useFetch<IResponse & { data: IIngredient[] }, unknown>(ENDPOINTS.ingredients);
    const response = await fetchApi.get();

    return response;
  }
);
