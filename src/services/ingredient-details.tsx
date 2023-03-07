import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../utils/types";

interface IngredientDetailsState {
  ingredientDetails?: IIngredient
}

const initialState: IngredientDetailsState = {}

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    initIngredientDetails: (
      state,
      action: PayloadAction<{ ingredient: IIngredient }>
    ) => {
      state.ingredientDetails = action.payload.ingredient;
    },
    clearIngredientDetails: (state) => {
      state.ingredientDetails = undefined;
    },
  },
});

export const { 
  initIngredientDetails,
  clearIngredientDetails, 
} = ingredientDetailsSlice.actions
