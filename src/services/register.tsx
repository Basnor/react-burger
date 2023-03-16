import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { COOKIE_LIFETIME_SEC, ENDPOINTS } from "../utils/contants";
import { setCookie } from "../utils/cookie";
import { IResponse, IUser } from "../utils/types";

interface IRegisterState {
  request: boolean;
  error: boolean;
  user?: IUser;
}

const initialState: IRegisterState = {
  request: false,
  error: false,
};

export const registerSlice = createSlice({
  name: "register",
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

        if (action.payload.success) {
          setCookie("accessToken", action.payload.accessToken, { expires: COOKIE_LIFETIME_SEC });
          setCookie("refreshToken", action.payload.refreshToken, { expires: COOKIE_LIFETIME_SEC });

          state.user = action.payload.user;
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.error(action.error.message);

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

type bodyType = IUser & { password: string };

export const register = createAsyncThunk<IResponse & IAuthResponse, bodyType>(
  "register/registerUser",
  async (user: bodyType) => {
    const fetchApi = useFetch<IResponse & IAuthResponse, bodyType>(ENDPOINTS.REGISTER);
    const response = await fetchApi.post(user);

    return response;
  }
);
