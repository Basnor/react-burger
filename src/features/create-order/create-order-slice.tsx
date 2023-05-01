import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../../hooks/useFetch";
import { ENDPOINTS } from "../../utils/contants";
import { getCookie } from "../../utils/cookie";
import { IOrder, IResponse } from "../../utils/types";
import { refreshToken } from "../refresh-token/refresh-token-slice";

interface CreateOrderState {
  orderDetails?: IOrder;
  request: boolean;
  error: boolean;
}

const initialState: CreateOrderState = {
  request: false,
  error: false,
};

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.request = false;
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log(action.error.message);

        state.request = false;
        state.error = true;
      });
  },
});

export const { 
  clearOrderDetails 
} = createOrderSlice.actions

export const createOrder = createAsyncThunk<IResponse & IOrder, { ingredients: string[] }>(
  'createOrder',
  async (ingredients: { ingredients: string[] }, { dispatch }) => {
    try {
      const token = getCookie('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      
      const fetchApi = useFetch<IResponse & IOrder, { ingredients: string[] }>(ENDPOINTS.ORDERS);
      const response = await fetchApi.post(ingredients, token);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "jwt expired") {
        await dispatch(refreshToken());

        const token = getCookie('accessToken');
        if (!token) {
          throw new Error('Access token not found');
        }
        
        const fetchApi = useFetch<IResponse & IOrder, { ingredients: string[] }>(ENDPOINTS.ORDERS);
        const response = await fetchApi.post(ingredients, token);

        return response;
      }

      throw error;
    }
  }
)
