import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { IOrder, IResponse } from "../utils/types";

interface OrderDetailsState {
  orderDetails?: IOrder;
  orderDetailsError: boolean;
}

const initialState: OrderDetailsState = {
  orderDetailsError: false,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderDetailsError = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderDetailsError = true;
      });
  },
});

export const { 
  clearOrderDetails 
} = orderDetailsSlice.actions

export const createOrder = createAsyncThunk<IResponse & IOrder, { ingredients: string[] }>(
  'orderDetails/createOrder',
  async (ingredients: { ingredients: string[] }) => {
    const fetchApi = useFetch<IResponse & IOrder, { ingredients: string[] }>(ENDPOINTS.orders);
    const response = await fetchApi.post(ingredients);

    return response;
  }
)
