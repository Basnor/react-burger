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
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;

      const dragIngredient = state.ingredients[dragIndex];
      const newIngredients = [...state.ingredients];

      // Удаляем перетаскиваемый элемент из массива
      newIngredients.splice(dragIndex, 1);

      // Вставляем элемент на место того элемента, над которым мы навели мышку с "перетаскиванием"
      newIngredients.splice(hoverIndex, 0, dragIngredient);

      state.ingredients = newIngredients;
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
