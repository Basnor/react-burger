import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { burgerIngredientsSlice } from "./burger-ingredients";
import { burgerConstructorSlice } from "./burger-constructor";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
