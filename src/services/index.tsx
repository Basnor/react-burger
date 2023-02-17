import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./reducers/burger-ingredients"

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
