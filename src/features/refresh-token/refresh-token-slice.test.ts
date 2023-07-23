import { refreshToken, refreshTokenSlice } from "./refresh-token-slice";

const reducer = refreshTokenSlice.reducer;

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    request: false,
    error: false,
  });
});

describe("refresh token", () => {
  const initialState = {
    request: false,
    error: false,
  };

  it("should being pending", () => {
    const action = { type: refreshToken.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should being fulfilled without success", () => {
    const action = { type: refreshToken.fulfilled.type, payload: { success: false }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
    });
  });

  it("should being fulfilled with success", () => {
    const action = { type: refreshToken.fulfilled.type, payload: { 
      success: true,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    }};
    const state = reducer(initialState, action);

    expect(state).toEqual({
      request: false,
      error: false,
    });
  });

  it("should being rejected", () => {
    const action = { type: refreshToken.rejected.type, error: { 
      message: "Unknown error happened",
    }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
    });
  });
});
