import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { IResponse } from "../utils/types";

interface IResetPasswordState {
  request: boolean;
  error: boolean;
  success: boolean;
}

const initialState: IResetPasswordState = {
  request: false,
  error: false,
  success: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.request = true;
        state.error = false;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;
        state.success = action.payload.success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.error(action.error.message);

        state.request = false;
        state.error = true;
        state.success = false;
      });
  },
});

export const resetPassword = createAsyncThunk<IResponse & { message: string }, { password: string; token: string; }>(
  "resetPassword/postResetPassword",
  async (user: { password: string; token: string; }) => {
    const fetchApi = useFetch<IResponse & { message: string }, { password: string; token: string; }>(ENDPOINTS.reset);
    const response = await fetchApi.post(user);

    return response;
  }
);
