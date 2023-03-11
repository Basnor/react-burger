import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../utils/contants";
import { getCookie } from "../utils/cookie";
import { IResponse, IUser } from "../utils/types";

interface IUserState {
  request: boolean;
  error: boolean;
  user?: IUser;
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

        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(getUser.rejected, (state) => {
        state.user = undefined;
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

        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error(action.error.message);

        state.request = false;
        state.error = true;
      });
  },
});

type responseType = IResponse & { user: IUser };
type updateBodyType = { email: string|null; name: string|null; password: string|null; };

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
    const response = await fetchApi.patch(user, token);

    return response;
  }
);