import { combineReducers, configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./reducers/burger-ingredients";
import burgerConstructorReducer from "./reducers/burger-constructor";

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  burgerConstructorReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
