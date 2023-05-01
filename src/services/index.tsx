import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { burgerIngredientsSlice } from "./burger-ingredients";
import { burgerConstructorSlice } from "./burger-constructor";
import { authSlice } from "./auth";
import { userSlice } from "./user";
import { refreshTokenSlice } from "../features/refresh-token/refresh-token-slice";
import { createOrderSlice } from "../features/create-order/create-order-slice";
import { forgotPasswordSlice } from "../features/forgot-password/forgot-password-slice";
import { resetPasswordSlice } from "../features/reset-password/reset-password-slice";
import { registerSlice } from "../features/register/register-slice";
import { createSocketMiddleware } from "./middleware/socket-middleware";
import {
  connect as LiveFeedWsConnect,
  disconnect as LiveFeedWsDisconnect,
  wsConnecting as LiveFeedWsConnecting,
  wsOpen as LiveFeedWsOpen,
  wsClose as LiveFeedWsClose,
  wsMessage as LiveFeedWsMessage,
  wsError as LiveFeedWsError,
  feedSlice
} from "./feed";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  createOrder: createOrderSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  register: registerSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  refreshToken: refreshTokenSlice.reducer,
  feed: feedSlice.reducer,
});

const wsActions = {
  connect: LiveFeedWsConnect,
  disconnect: LiveFeedWsDisconnect,
  wsConnecting: LiveFeedWsConnecting,
  wsOpen: LiveFeedWsOpen,
  wsClose: LiveFeedWsClose,
  wsMessage: LiveFeedWsMessage,
  wsError: LiveFeedWsError,
};

const websocketMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
