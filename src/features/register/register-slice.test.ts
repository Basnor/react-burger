import { IUser } from "../../utils/types";
import { register, registerSlice } from "./register-slice";

const reducer = registerSlice.reducer;

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

describe("register", () => {
  const initialState = {
    request: false,
    error: false,
    user: undefined,
  };

  it("should be pending", () => {
    const action = { type: register.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should be fulfilled without success", () => {
    const action = { type: register.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
    });
  });

  it("should be fulfilled with success", () => {
    const action = { type: register.fulfilled.type, payload: { 
      success: true,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      user,
    }};
    const state = reducer(initialState, action);

    expect(state).toEqual({
      request: false,
      error: false,
      user,
    });
  });

  it("should be rejected", () => {
    const action = { type: register.rejected.type, error: { 
      message: "Unknown error happened",
    }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
    });
  });
});
