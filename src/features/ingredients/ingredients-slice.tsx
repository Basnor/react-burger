import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import useFetch from "../../hooks/useFetch";
import { ENDPOINTS } from "../../utils/contants";
import { IIngredient, IResponse } from "../../utils/types";

export const getIngredients = createAsyncThunk<IResponse & { data: IIngredient[] }>(
  "ingredients/getIngredients", 
  async () => {
    const fetchApi = useFetch<IResponse & { data: IIngredient[] }, unknown>(ENDPOINTS.INGREDIENTS);
    const response = await fetchApi.get();

    return response;
  }
);

interface IngredientsState {
  request: boolean;
  error: boolean;
  ingredients: IIngredient[];
  ingredientDetails?: IIngredient;
}

const initialState: IngredientsState = {
  request: false,
  error: false,
  ingredients: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    initIngredientDetails: (state, action: PayloadAction<{ ingredientId: string }>) => {
      const ingredient =  state.ingredients.find(({ _id }) => _id === action.payload.ingredientId);
      
      state.ingredientDetails = ingredient;
    },
    clearIngredientDetails: (state) => {
      state.ingredientDetails = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success) {
          state.ingredients = action.payload.data;
        }
      })
      .addCase(getIngredients.rejected, (state, action) => {
        console.log(action.error.message);
        
        state.request = false;
        state.error = true;
      });
  },
});

export const { 
  initIngredientDetails,
  clearIngredientDetails, 
} = ingredientsSlice.actions;
