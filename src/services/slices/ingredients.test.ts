import { IIngredient, IngredientType } from "../../utils/types";
import {
  clearIngredientDetails,
  getIngredients,
  ingredientsSlice,
  initIngredientDetails,
  initialState,
} from "./ingredients";

const reducer = ingredientsSlice.reducer;
const ingredients: IIngredient[] = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun" as IngredientType,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0940",
    name: "Говяжий метеорит (отбивная)",
    type: "main" as IngredientType,
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
];
const currentIngredient = ingredients[0];

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle an ingredient being detailed", () => {
  const previousState = {
    request: true,
    error: false,
    ingredients: ingredients,
  };

  expect(
    reducer(
      previousState,
      initIngredientDetails({ ingredientId: currentIngredient._id })
    )
  ).toEqual({
    request: true,
    error: false,
    ingredients: ingredients,
    ingredientDetails: currentIngredient,
  });
});

test("should handle an ingredient being cleared", () => {
  const previousState = {
    request: true,
    error: false,
    ingredients: ingredients,
    ingredientDetails: currentIngredient,
  };

  expect(reducer(previousState, clearIngredientDetails())).toEqual({
    request: true,
    error: false,
    ingredients: ingredients,
  });
});

test("should handle an ingredient being pending", () => {
  const action = { type: getIngredients.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    request: true,
  });
});

test("should handle an ingredient being fulfilled without success", () => {
  const action = { type: getIngredients.fulfilled.type, payload: { success: false }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    ingredients: [],
  });
});

test("should handle an ingredient being fulfilled with success", () => {
  const action = { type: getIngredients.fulfilled.type, payload: { 
    success: true, 
    data: ingredients 
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: false,
    ingredients: ingredients,
  });
});

test("should handle an ingredient being rejected", () => {
  const action = { type: getIngredients.rejected.type, error: { 
    message: "Unknown error happened",
  }};
  const state = reducer(initialState, action);

  expect(state).toEqual({
    request: false,
    error: true,
    ingredients: [],
  });
});
