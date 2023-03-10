import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { IResponse } from "../utils/types";

interface IForgotPasswordState {
  request: boolean;
  error: boolean;
  success: boolean;
}

const initialState: IForgotPasswordState = {
  request: false,
  error: false,
  success: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.request = true;
        state.error = false;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;
        state.success = action.payload.success;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.request = false;
        state.error = true;
      });
  },
});

export const forgotPassword = createAsyncThunk<IResponse & { message: string }, { email: string }>(
  "forgotPassword/postForgotPassword",
  async (user: { email: string }) => {
    const fetchApi = useFetch<IResponse & { message: string }, { email: string }>(ENDPOINTS.forgot);
    const response = await fetchApi.post(user);

    return response;
  }
);
