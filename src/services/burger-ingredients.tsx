import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { endpoints } from "../utils/contants";
import { IIngredient, IResponse } from "../utils/types";

interface BurgerIngredientsState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: boolean;
}

const initialState: BurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
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
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.ingredientsError = !action.payload.success;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsError = true;
      });
  },
});

export const getIngredients = createAsyncThunk<IResponse & { data: IIngredient[] }>(
  "burgerIngredients/getIngredientIngredientTypes", 
  async () => {
    const { get } = useFetch<IResponse & { data: IIngredient[] }, unknown>(
      endpoints.ingredients
    );
    const response = await get();

    return response;
  }
);
