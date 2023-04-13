import { createAction, createSlice } from "@reduxjs/toolkit";

import { IFeeds } from "../utils/types";
import { WebsocketStatus } from "./socket-middleware";

export const connect = createAction<string, "FEED_CONNECT">("FEED_CONNECT");
export const disconnect = createAction("FEED_DISCONNECT");
export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsMessage = createAction<IFeeds, "FEED_WS_MESSAGE">("FEED_WS_MESSAGE");
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

const initialState: IFeedState & IFeeds = {
  status: WebsocketStatus.OFFLINE,
  error: '',
  feeds: [],
  total: 0,
  totalToday: 0,
};

export const feedSlice = createSlice({
  name: "auth",
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
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.feeds = action.payload.feeds;
      });
  },
});
