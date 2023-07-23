import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../../hooks/useFetch";
import { COOKIE_LIFETIME_SEC, ENDPOINTS } from "../../utils/contants";
import { getCookie, setCookie } from "../../utils/cookie";
import { IResponse, IUser } from "../../utils/types";

interface ILoginResponse extends IResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

type LoginBody = { 
  email: string; 
  password: string 
};

export const login = createAsyncThunk<ILoginResponse, LoginBody>(
  "auth/login",
  async (user: LoginBody) => {
    const fetchApi = useFetch<ILoginResponse, LoginBody>(ENDPOINTS.LOGIN);
    const response = await fetchApi.post(user);

    return response;
  }
);

export const logout = createAsyncThunk<IResponse>(
  "auth/logout",
  async () => {
    const token = getCookie('refreshToken');
    if (!token) {
      throw new Error('Refresh token required');
    }

    const fetchApi = useFetch<IResponse, { token: string }>(ENDPOINTS.LOGOUT);
    const response = await fetchApi.post({ token });

    return response;
  }
);

interface IAuthState {
  request: boolean;
  error: boolean;
  user?: IUser;
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
      .addCase(login.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success) {
          setCookie("accessToken", action.payload.accessToken, { expires: COOKIE_LIFETIME_SEC });
          setCookie("refreshToken", action.payload.refreshToken, { expires: COOKIE_LIFETIME_SEC });

          state.user = action.payload.user;
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);

        state.request = false;
        state.error = true;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success) {
          setCookie("accessToken", "", { expires: -1 });
          setCookie("refreshToken", "", { expires: -1 });

          state.user = undefined;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.error.message);

        state.request = false;
        state.error = true;
      });
  },
});
