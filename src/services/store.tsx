import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  connect as LiveFeedWsConnect,
  disconnect as LiveFeedWsDisconnect,
  wsConnecting as LiveFeedWsConnecting,
  wsOpen as LiveFeedWsOpen,
  wsClose as LiveFeedWsClose,
  wsMessage as LiveFeedWsMessage,
  wsError as LiveFeedWsError,
  feedSlice
} from "../features/feed/feed-slice";
import { ingredientsSlice } from "../features/ingredients/ingredients-slice";
import { userSlice } from "../features/user/user-slice";
import { createSocketMiddleware } from "./middleware/socket-middleware";
import { authSlice } from "../features/auth/auth-slice";
import { burgerConstructorSlice } from "../features/burger-constructor/burger-constructor-slice";
import { refreshTokenSlice } from "../features/refresh-token/refresh-token-slice";
import { createOrderSlice } from "../features/create-order/create-order-slice";
import { forgotPasswordSlice } from "../features/forgot-password/forgot-password-slice";
import { resetPasswordSlice } from "../features/reset-password/reset-password-slice";
import { registerSlice } from "../features/register/register-slice";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
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

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware);
  },
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
