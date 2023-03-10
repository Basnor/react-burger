import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { COOKIE_LIFETIME_SEC, ENDPOINTS } from "../utils/contants";
import { setCookie } from "../utils/cookie";
import { IResponse, IUser } from "../utils/types";

interface IAuthState {
  request: boolean;
  error: boolean;
  user?: IUser;
  errorMessage?: string;
}

const initialState: IAuthState = {
  request: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;
        if (action.payload.success && "user" in action.payload) {
          setCookie("accessToken", action.payload.accessToken, { expires: COOKIE_LIFETIME_SEC });
          setCookie("refreshToken", action.payload.refreshToken, { expires: COOKIE_LIFETIME_SEC });

          state.user = action.payload.user;
        }

        if (!action.payload.success && "message" in action.payload) {
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(register.rejected, (state) => {
        state.request = false;
        state.error = true;
      });

    builder
      .addCase(login.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success && "user" in action.payload) {
          setCookie("accessToken", action.payload.accessToken, { expires: COOKIE_LIFETIME_SEC });
          setCookie("refreshToken", action.payload.refreshToken, { expires: COOKIE_LIFETIME_SEC });

          state.user = action.payload.user;
        }

        if (!action.payload.success && "message" in action.payload) {
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(login.rejected, (state) => {
        state.request = false;
        state.error = true;
      });
  },
});

interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

type responseType = (IResponse & IAuthResponse) | (IResponse & { message: string });
type bodyType = { user: IUser & { password: string } };

export const register = createAsyncThunk<responseType, bodyType>(
  "auth/register",
  async (user: bodyType) => {
    const fetchApi = useFetch<responseType, bodyType>(ENDPOINTS.register);
    const response = await fetchApi.post(user);

    return response;
  }
);

export const login = createAsyncThunk<responseType, bodyType>(
  "auth/login",
  async (user: bodyType) => {
    const fetchApi = useFetch<responseType, bodyType>(ENDPOINTS.login);
    const response = await fetchApi.post(user);

    return response;
  }
);
