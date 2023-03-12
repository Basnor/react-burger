import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { burgerIngredientsSlice } from "./burger-ingredients";
import { burgerConstructorSlice } from "./burger-constructor";
import { ingredientDetailsSlice } from "./ingredient-details";
import { orderDetailsSlice } from "./order-details";
import { authSlice } from "./auth";
import { userSlice } from "./user";
import { forgotPasswordSlice } from "./forgot-password";
import { resetPasswordSlice } from "./reset-password";
import { registerSlice } from "./register";
import { refreshTokenSlice } from "./refresh-token";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  register: registerSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  refreshToken: refreshTokenSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
