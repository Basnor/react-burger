import { createAction, createSlice } from "@reduxjs/toolkit";

import { IOrderFeed, IResponse } from "../utils/types";
import { WebsocketStatus } from "./socket-middleware";

export const connect = createAction<{ url: string, token?: boolean }, "FEED_CONNECT">("FEED_CONNECT");
export const disconnect = createAction("FEED_DISCONNECT");
export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsMessage = createAction<IOrderFeed & IResponse, "FEED_WS_MESSAGE">("FEED_WS_MESSAGE");
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");

export type LiveFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;

interface IFeedState {
  status: WebsocketStatus;
  error: string;
}

const initialState: IFeedState & IOrderFeed = {
  status: WebsocketStatus.OFFLINE,
  error: '',
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
        state.error = '';
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});
