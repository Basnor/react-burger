import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { COOKIE_LIFETIME_SEC, ENDPOINTS } from "../utils/contants";
import { getCookie, setCookie } from "../utils/cookie";
import { IResponse } from "../utils/types";

interface IRefreshTokenState {
  request: boolean;
  error: boolean;
}

const initialState: IRefreshTokenState = {
  request: false,
  error: false,
};

export const refreshTokenSlice = createSlice({
  name: "refreshToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.request = true
        state.error = false
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success) {
          setCookie("accessToken", action.payload.accessToken, { expires: COOKIE_LIFETIME_SEC });
          setCookie("refreshToken", action.payload.refreshToken, { expires: COOKIE_LIFETIME_SEC });
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        console.log(action.error.message);

        state.request = false;
        state.error = true;
      });
  },
});

interface ITokenRefreshResponse {
  accessToken: string
  refreshToken: string
}

export const refreshToken = createAsyncThunk<IResponse & ITokenRefreshResponse>(
  "token/refresh",
  async () => {
    const token = getCookie("refreshToken");
    if (!token) {
      throw new Error("Refresh token required.");
    }

    const fetchApi = useFetch<IResponse & ITokenRefreshResponse, { token: string }>(ENDPOINTS.TOKEN);
    const response = await fetchApi.post({ token });

    return response;
  }
);
