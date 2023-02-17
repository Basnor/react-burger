import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/types";
import { getIngredients } from "../actions/burger-ingredients";

export interface BurgerIngredientsState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: boolean;
}

const initialState: BurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

const burgerIngredientsSlice = createSlice({
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

export default burgerIngredientsSlice.reducer;
