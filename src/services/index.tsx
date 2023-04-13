import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { burgerIngredientsSlice } from "./burger-ingredients";
import { burgerConstructorSlice } from "./burger-constructor";
import { orderDetailsSlice } from "./order-details";
import { authSlice } from "./auth";
import { userSlice } from "./user";
import { forgotPasswordSlice } from "./forgot-password";
import { resetPasswordSlice } from "./reset-password";
import { registerSlice } from "./register";
import { refreshTokenSlice } from "./refresh-token";
import { feedSlice } from "./feed";
import { createSocketMiddleware } from "./socket-middleware";
import {
  connect as LiveFeedWsConnect,
  disconnect as LiveFeedWsDisconnect,
  wsConnecting as LiveFeedWsConnecting,
  wsOpen as LiveFeedWsOpen,
  wsClose as LiveFeedWsClose,
  wsMessage as LiveFeedWsMessage,
  wsError as LiveFeedWsError,
} from "./feed";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
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

// export type TDispatch = ThunkDispatch<RootState, never, TLiveTableActions>

// export const useDispatch = () => dispatchHook<TDispatch>()
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
