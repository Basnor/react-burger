import { createOrder, createOrderSlice } from "./create-order-slice";

const reducer = createOrderSlice.reducer;

const order = {
  name: "Астероидный фалленианский минеральный альфа-сахаридный краторный бургер",
  order: {
    number: 12345
  }
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    request: false,
    error: false,
  });
});

describe("create order", () => {
  const initialState = {
    request: false,
    error: false,
  };

  it("should be pending", () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should be fulfilled", () => {
    const action = { type: createOrder.fulfilled.type, payload: order };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      request: false,
      error: false,
      orderDetails: order,
    });
  });

  it("should be rejected", () => {
    const action = { type: createOrder.rejected.type, error: { 
      message: "Unknown error happened",
    }};
    const state = reducer(initialState, action);
  
    expect(state).toEqual({
      request: false,
      error: true,
      orderDetails: undefined,
    });
  });
});
