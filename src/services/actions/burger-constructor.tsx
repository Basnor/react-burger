import { burgerConstructorSlice } from "../reducers/burger-constructor";

export const {
  resetBurgerIngredients,
  removeBurgerIngredient,
  addBurgerIngredient,
  moveBurgerIngredient,
} = burgerConstructorSlice.actions;
