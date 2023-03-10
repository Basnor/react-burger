import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { IIngredient, IResponse } from "../utils/types";

interface BurgerIngredientsState {
  ingredients: IIngredient[];
  ingredientsError: boolean;
}

const initialState: BurgerIngredientsState = {
  ingredients: [],
  ingredientsError: false,
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredients = [];
        state.ingredientsError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.ingredientsError = !action.payload.success;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsError = true;
      });
  },
});

export const getIngredients = createAsyncThunk<IResponse & { data: IIngredient[] }>(
  "burgerIngredients/getIngredientIngredientTypes", 
  async () => {
    const { get } = useFetch<IResponse & { data: IIngredient[] }, unknown>(
      ENDPOINTS.ingredients
    );
    const response = await get();

    return response;
  }
);
