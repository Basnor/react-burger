import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { getCookie } from "../utils/cookie";
import { IOrder, IResponse } from "../utils/types";

interface OrderDetailsState {
  orderDetails?: IOrder;
  error: boolean;
}

const initialState: OrderDetailsState = {
  error: false,
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
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.error(action.error.message);

        state.error = true;
      });
  },
});

export const { 
  clearOrderDetails 
} = orderDetailsSlice.actions

export const createOrder = createAsyncThunk<IResponse & IOrder, { ingredients: string[] }>(
  'orderDetails/createOrder',
  async (ingredients: { ingredients: string[] }) => {
    const token = getCookie('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }
    
    const fetchApi = useFetch<IResponse & IOrder, { ingredients: string[] }>(ENDPOINTS.orders);
    const response = await fetchApi.post(ingredients, token);

    return response;
  }
)
