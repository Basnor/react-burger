import { IUser } from "../../utils/types";
import { getUser, updateUser, userSlice } from "./user-slice";

const reducer = userSlice.reducer;
const user: IUser = {
  email: 'anastasiya@anastasiya.com',
  name: 'anastasiya',
}

test("should return the initial state", () => {
  const initialState = {
    request: false,
    error: false,
  };

  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

describe("get user", () => {
  const initialState = {
    request: false,
    error: false,
  };

  test("should be pending", () => {
    const action = { type: getUser.pending.type };
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });
  
  test("should be fulfilled without success", () => {
    const action = { type: getUser.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      user: undefined,
    });
  });
  
  test("should be fulfilled with success", () => {
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
  
  test("should be rejected", () => {
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
});

describe("update user", () => {
  const initialState = {
    request: false,
    error: false,
  };

  test("should be pending", () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });
  
  test("should be fulfilled without success", () => {
    const action = { type: updateUser.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      user: undefined,
    });
  });
  
  test("should be fulfilled with success", () => {
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
  
  test("should be rejected", () => {
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
});
