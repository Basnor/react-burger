import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { burgerIngredientsSlice } from "./burger-ingredients";
import { burgerConstructorSlice } from "./burger-constructor";
import { ingredientDetailsSlice } from "./ingredient-details";
import { orderDetailsSlice } from "./order-details";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
