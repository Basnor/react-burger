import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch from "../../hooks/useFetch";
import { endpoints } from "../../utils/contants";
import { IIngredient, IResponse } from "../../utils/types";

export const getIngredients = createAsyncThunk<IResponse & { data: IIngredient[] }>(
  "burgerIngredients/getIngredients", 
  async () => {
    const { get } = useFetch<IResponse & { data: IIngredient[] }, unknown>(
      endpoints.ingredients
    );
    const response = await get();

    return response;
  }
);
