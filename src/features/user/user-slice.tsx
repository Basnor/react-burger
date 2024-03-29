import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useFetch from "../../hooks/useFetch";
import { ENDPOINTS } from "../../utils/contants";
import { getCookie } from "../../utils/cookie";
import { IResponse, IUser } from "../../utils/types";
import { refreshToken } from "../refresh-token/refresh-token-slice";

type responseType = IResponse & { user: IUser };
type updateBodyType = { 
  email: string | null; 
  name: string | null; 
  password: string | null;
};

export const getUser = createAsyncThunk<responseType>(
  "user/getUser",
  async (_, { dispatch }) => {
    try {
      return await getUser();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "jwt expired") {
        await dispatch(refreshToken());

        return await getUser();
      }

      throw error;
    }
    
    async function getUser() {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const fetchApi = useFetch<responseType, undefined>(ENDPOINTS.USER);
      const response = await fetchApi.get(token);

      return response;
    }
  }
);

export const updateUser = createAsyncThunk<responseType, updateBodyType>(
  "user/updateUser",
  async (user: updateBodyType, { dispatch }) => {
    try {
      return await patchUser();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "jwt expired") {
        await dispatch(refreshToken());

        return await patchUser();
      }

      throw error;
    }

    async function patchUser() {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const fetchApi = useFetch<responseType, updateBodyType>(ENDPOINTS.USER);
      const response = await fetchApi.patch(user, token);

      return response;
    }
  }
);

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
      .addCase(getUser.rejected, (state, action) => {
        console.log(action.error.message);

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
        console.log(action.error.message);

        state.request = false;
        state.error = true;
      });
  },
});
