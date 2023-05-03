import { IOrderFeedItem } from "../../utils/types";
import { WebsocketStatus } from "../../services/middleware/socket-middleware";
import { feedSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./feed-slice";

const reducer = feedSlice.reducer;
const orders: IOrderFeedItem[] = [
  {
    _id: "643d6bef2202fb001db2bd30",
    ingredients: ["643d69a5c3f7b9001cfa0948", "643d69a5c3f7b9001cfa0948"],
    status: "done",
    name: "Альфа-сахаридный бургер",
    createdAt: "2023-04-17T15:55:27.990Z",
    updatedAt: "2023-04-17T15:55:28.055Z",
    number: 376,
  },
  {
    _id: "643d750e45c6f2001be6ad4a",
    ingredients: ["643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
    status: "done",
    name: "Антарианский краторный бургер",
    createdAt: "2023-04-17T16:34:22.117Z",
    updatedAt: "2023-04-17T16:34:22.139Z",
    number: 481,
  },
];
const total = 5000;
const totalToday = 200;

test("should return the initial state", () => {
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    error: '',
    orders: [],
    total: 0,
    totalToday: 0,
  };

  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

describe("WebSocket", () => {
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    error: '',
    orders: [],
    total: 0,
    totalToday: 0,
  };

  test("should ws be connecting", () => {
    const action = { type: wsConnecting.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  test("should be opened", () => {
    const action = { type: wsOpen.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  test("should be closed", () => {
    const action = { type: wsClose.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  test("should get error", () => {
    const action = { type: wsError.type, payload: "Unknown error happened" };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: action.payload,
    });
  });

  test("should get message", () => {
    const action = {
      type: wsMessage.type,
      payload: {
        orders,
        total,
        totalToday,
      },
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders,
      total,
      totalToday,
    });
  });
});
