import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../utils/types";

interface IngredientDetailsState {
  ingredient?: IIngredient
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
      state.ingredient = action.payload.ingredient;
    },
    clearIngredientDetails: (state) => {
      state.ingredient = undefined;
    },
  },
});

export const { 
  initIngredientDetails,
  clearIngredientDetails, 
} = ingredientDetailsSlice.actions
