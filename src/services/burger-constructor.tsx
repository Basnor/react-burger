import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../utils/types";

interface BurgerConstructorState {
  ingredients: (IIngredient & { uid: string })[];
}

const initialState: BurgerConstructorState = {
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBurgerIngredient: (
      state,
      action: PayloadAction<{ ingredient: IIngredient & { uid: string } }>
    ) => {
      const { ingredient } = action.payload;

      state.ingredients.push(ingredient);
    },
    removeBurgerIngredient: (
      state,
      action: PayloadAction<{ ingredient: IIngredient & { uid: string  }}>
    ) => {
      const { ingredient } = action.payload;

      state.ingredients = state.ingredients.filter(({uid}) => uid !== ingredient.uid);
    },
    moveBurgerIngredient: (
      state,
      action: PayloadAction<{ newIndex: number; oldIndex: number }>
    ) => {
      const { newIndex, oldIndex } = action.payload;

      state.ingredients.splice(
        newIndex,
        0,
        state.ingredients.splice(oldIndex, 1)[0]
      );
    },
    resetBurgerIngredients: () => {
      return initialState;
    },
  },
});

export const {
  resetBurgerIngredients,
  removeBurgerIngredient,
  addBurgerIngredient,
  moveBurgerIngredient,
} = burgerConstructorSlice.actions;
