import { forgotPassword, forgotPasswordSlice } from "./forgot-password-slice";

const reducer = forgotPasswordSlice.reducer;

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    request: false,
    error: false,
    success: false,
  });
});

describe("forgot password", () => {
  const initialState = {
    request: false,
    error: false,
    success: false,
  };

  it("should be pending", () => {
    const action = { type: forgotPassword.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should be fulfilled without success", () => {
    const action = { type: forgotPassword.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      success: false,
    });
  });

  it("should be fulfilled with success", () => {
    const action = { type: forgotPassword.fulfilled.type, payload: { 
      request: false,
      error: false,
      success: true,
    }};
    const state = reducer(initialState, action);

    expect(state).toEqual({
      request: false,
      error: false,
      success: true,
    });
  });

  it("should be rejected", () => {
    const action = { type: forgotPassword.rejected.type, error: { 
      message: "Unknown error happened",
    }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      success: false,
    });
  });
});
