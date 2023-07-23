import { IUser } from "../../utils/types";
import { authSlice, login, logout } from "./auth-slice";

const reducer = authSlice.reducer;

const user: IUser = {
  email: "anastasiya@anastasiya.com",
  name: "anastasiya",
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    request: false,
    error: false,
  });
});

describe("login", () => {
  const initialState = {
    request: false,
    error: false,
  };

  it("should be pending", () => {
    const action = { type: login.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should be fulfilled without success", () => {
    const action = { type: login.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      user: undefined,
    });
  });

  it("should be fulfilled with success", () => {
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

  it("should be rejected", () => {
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
});

describe("logout", () => {
  const initialState = {
    request: false,
    error: false,
    user,
  };

  it("should be pending", () => {
    const action = { type: logout.pending.type };
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });
  
  it("should be fulfilled without success", () => {
    const action = { type: logout.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      ...initialState,
      error: true,
    });
  });
  
  it("should be fulfilled with success", () => {
    const action = { type: logout.fulfilled.type, payload: { success: true }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: false,
      user: undefined,
    });
  });
  
  it("should be rejected", () => {
    const action = { type: logout.rejected.type, error: { 
      message: "Unknown error happened",
    }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      ...initialState,
      error: true,
    });
  });  
});
