import { IUser } from "../../utils/types";
import { authSlice, initialState, login, logout } from "./auth-slice";

const reducer = authSlice.reducer;

const user: IUser = {
  email: "anastasiya@anastasiya.com",
  name: "anastasiya",
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle login being pending", () => {
  const action = { type: login.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    request: true,
  });
});

test("should handle login being fulfilled without success", () => {
  const action = { type: login.fulfilled.type, payload: { success: false }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});

test("should handle login being fulfilled with success", () => {
  const accessToken = "accessToken";
  const refreshToken = "refreshToken";
  const action = { type: login.fulfilled.type, payload: { 
    success: true,
    accessToken,
    refreshToken,
    user 
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: false,
    user,
  });
});

test("should handle login being rejected", () => {
  const action = { type: login.rejected.type, error: { 
    message: "Unknown error happened",
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});

test("should handle logout being pending", () => {
  const initialState = {
    request: false,
    error: false,
    user,
  };
  const action = { type: logout.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    request: true,
  });
});

test("should handle logout being fulfilled without success", () => {
  const initialState = {
    request: false,
    error: false,
    user,
  };
  const action = { type: logout.fulfilled.type, payload: { success: false }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    error: true,
  });
});

test("should handle logout being fulfilled with success", () => {
  const initialState = {
    request: false,
    error: false,
    user,
  };
  const action = { type: logout.fulfilled.type, payload: { success: true }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: false,
    user: undefined,
  });
});

test("should handle logout being rejected", () => {
  const initialState = {
    request: false,
    error: false,
    user,
  };
  const action = { type: logout.rejected.type, error: { 
    message: "Unknown error happened",
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    error: true,
  });
});
