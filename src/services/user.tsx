import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { getCookie } from "../utils/cookie";
import { IResponse, IUser } from "../utils/types";

interface IUserState {
  request: boolean;
  error: boolean;
  user?: IUser;
  errorMessage?: string;
}

const initialState: IUserState = {
  request: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;

        if (action.payload.success && "user" in action.payload) {
          state.user = action.payload.user;
        }

        if (!action.payload.success && "message" in action.payload) {
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(getUser.rejected, (state) => {
        state.request = false;
        state.error = true;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.request = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.error = !action.payload.success;


        if (action.payload.success && "user" in action.payload) {
          state.user = action.payload.user;
        }

        if (!action.payload.success && "message" in action.payload) {
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.request = false;
        state.error = true;
      });
  },
});

type responseType = (IResponse & { user: IUser }) | (IResponse & { message: string });
type updateBodyType = { user: IUser & { password: string }};

export const getUser = createAsyncThunk<responseType>(
  "user/getUser",
  async () => {
    const token = getCookie('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const fetchApi = useFetch<responseType, undefined>(ENDPOINTS.user);
    const response = await fetchApi.get(token);

    return response;
  }
);

export const updateUser = createAsyncThunk<responseType, updateBodyType>(
  "user/updateUser",
  async (user: updateBodyType) => {
    const token = getCookie('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const fetchApi = useFetch<responseType, updateBodyType>(ENDPOINTS.user);
    const response = await fetchApi.path(user, token);

    return response;
  }
);