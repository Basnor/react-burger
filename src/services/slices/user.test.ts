import { IUser } from "../../utils/types";
import { getUser, initialState, updateUser, userSlice } from "./user";

const reducer = userSlice.reducer;
const user: IUser = {
  email: 'anastasiya@anastasiya.com',
  name: 'anastasiya',
}

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle an user being pending", () => {
  const action = { type: getUser.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    request: true,
  });
});

test("should handle an user being fulfilled without success", () => {
  const action = { type: getUser.fulfilled.type, payload: { success: false }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});

test("should handle an user being fulfilled with success", () => {
  const action = { type: getUser.fulfilled.type, payload: { 
    success: true, 
    user: user 
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: false,
    user: user,
  });
});

test("should handle an user being rejected", () => {
  const action = { type: getUser.rejected.type, error: { 
    message: "Unknown error happened",
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});

test("should handle an update user being pending", () => {
  const action = { type: updateUser.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    request: true,
  });
});

test("should handle an update user being fulfilled without success", () => {
  const action = { type: updateUser.fulfilled.type, payload: { success: false }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});

test("should handle an update user being fulfilled with success", () => {
  const action = { type: updateUser.fulfilled.type, payload: { 
    success: true, 
    user: user 
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: false,
    user: user,
  });
});

test("should handle an update user being rejected", () => {
  const action = { type: updateUser.rejected.type, error: { 
    message: "Unknown error happened",
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    user: undefined,
  });
});
