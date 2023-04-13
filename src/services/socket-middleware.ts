import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";

import { IFeeds } from "../utils/types";
import { LiveFeedActions } from "./feed";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

type wsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<IFeeds>;
};

export const createSocketMiddleware = (wsActions: wsActionTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action: LiveFeedActions) => {
      const { dispatch } = store;
      const {
        connect,
        disconnect,
        wsClose,
        wsConnecting,
        wsError,
        wsMessage,
        wsOpen,
      } = wsActions;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        reconnectTimer = 0;

        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError("Websocket error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData: IFeeds = JSON.parse(data);

          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }

          if (isConnected) {
            dispatch(wsConnecting());

            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, 3000);
          }
        };
      }

      if (socket && disconnect.match(action)) {
        window.clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        dispatch(wsClose());
        socket.close();
      }

      next(action);
    };
  };
};
