import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { IOrderFeed, IResponse } from "../utils/types";
import { LiveFeedActions } from "./feed";
import { AppDispatch, RootState } from ".";
import { refreshToken } from "./refresh-token";
import { getCookie, setCookie } from "../utils/cookie";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

type wsActionTypes = {
  connect: ActionCreatorWithPayload<{ url: string, token?: boolean }>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<IOrderFeed & IResponse>;
};

export const createSocketMiddleware = (wsActions: wsActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = "";
    let token = "";
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
        url = action.payload.url;
        token = action.payload.token ? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : "";
        socket = new WebSocket(url + token);
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
          const parsedData: (IOrderFeed & IResponse) = JSON.parse(data);

          if (parsedData.message === 'Invalid or missing token') {
            setCookie("accessToken", "", { expires: -1 });

            dispatch(refreshToken());

            return;
          }

          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }

          if (isConnected) {
            dispatch(wsConnecting());

            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, token: !!token }));
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
