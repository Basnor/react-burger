import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IngredientType } from "../utils/types";

interface BurgerConstructorState {
  toppings: (IIngredient & { uid: string })[];
  bun?: IIngredient;
}

const initialState: BurgerConstructorState = {
  toppings: []
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

      if (ingredient.type === IngredientType.Bun) {
        state.bun = ingredient;
        return;
      }

      state.toppings.push(ingredient);
    },
    removeBurgerIngredient: (
      state,
      action: PayloadAction<{ ingredient: IIngredient & { uid: string  }}>
    ) => {
      const { ingredient } = action.payload;

      if (ingredient.type === IngredientType.Bun) {
        return;
      }

      state.toppings = state.toppings.filter(({uid}) => uid !== ingredient.uid);
    },
    moveBurgerIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;

      const dragIngredient = state.toppings[dragIndex];
      const newIngredients = [...state.toppings];

      // Удаляем перетаскиваемый элемент из массива
      newIngredients.splice(dragIndex, 1);

      // Вставляем элемент на место того элемента, над которым мы навели мышку с "перетаскиванием"
      newIngredients.splice(hoverIndex, 0, dragIngredient);

      state.toppings = newIngredients;
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
