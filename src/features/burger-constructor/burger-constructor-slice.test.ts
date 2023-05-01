import { IIngredient, IngredientType } from "../../utils/types";
import { addBurgerIngredient, burgerConstructorSlice, moveBurgerIngredient, removeBurgerIngredient, resetBurgerIngredients } from "./burger-constructor-slice";

const reducer = burgerConstructorSlice.reducer;

const addedToppingIngredient: IIngredient & { uid: string } = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main" as IngredientType,
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
  uid: "wr29jImSr6U7DHdRjdzzd",
};

const addedBunIngredient: IIngredient & { uid: string } = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun' as IngredientType,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  uid: 'SkRQKvdv3MBEk5B47D3gb'
};

const toppings: (IIngredient & { uid: string })[] = [
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main" as IngredientType,
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
    uid: "EeWDcVd2Ar7mpKrYlxJvV",
  },
  {
    _id: "643d69a5c3f7b9001cfa0944",
    name: "Соус традиционный галактический",
    type: "sauce" as IngredientType,
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
    uid: "BkzfQR7SGcj8Caay_wvlJ",
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main" as IngredientType,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    uid: "6aaS_GoI6ZIXj2jQSNqxs",
  },
];

const movedIngredients: (IIngredient & { uid: string })[] = [
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main" as IngredientType,
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
    uid: "EeWDcVd2Ar7mpKrYlxJvV",
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main" as IngredientType,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    uid: "6aaS_GoI6ZIXj2jQSNqxs",
  },
  {
    _id: "643d69a5c3f7b9001cfa0944",
    name: "Соус традиционный галактический",
    type: "sauce" as IngredientType,
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
    uid: "BkzfQR7SGcj8Caay_wvlJ",
  },
];

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    toppings: []
  });
});

test("should handle burger topping ingredient being added", () => {
  const previousState = {
    toppings: []
  };

  expect(reducer(previousState, addBurgerIngredient({ingredient: addedToppingIngredient}))).toEqual({
    toppings: [
      addedToppingIngredient
    ]
  });
});

test("should handle burger bun ingredient being added", () => {
  const previousState = {
    toppings: []
  };

  expect(reducer(previousState, addBurgerIngredient({ingredient: addedBunIngredient}))).toEqual({
    toppings: [],
    bun: addedBunIngredient,
  });
});

test("should handle burger topping ingredient being removed", () => {
  const previousState = {
    toppings: [addedToppingIngredient],
    bun: addedBunIngredient,
  };

  expect(reducer(previousState, removeBurgerIngredient({ingredient: addedToppingIngredient}))).toEqual({
    toppings: [],
    bun: addedBunIngredient,
  });
});

test("should handle burger bun ingredient being removed", () => {
  const previousState = {
    toppings: [addedToppingIngredient],
    bun: addedBunIngredient,
  };

  expect(reducer(previousState, removeBurgerIngredient({ingredient: addedBunIngredient}))).toEqual({
    toppings: [addedToppingIngredient],
    bun: addedBunIngredient,
  });
});

test("should handle burger ingredient being moved", () => {
  const previousState = {
    toppings: toppings,
    bun: addedBunIngredient,
  };

  expect(reducer(previousState, moveBurgerIngredient({dragIndex: 2, hoverIndex: 1}))).toEqual({
    toppings: movedIngredients,
    bun: addedBunIngredient,
  });
});

test("should handle burger ingredient being reset", () => {
  const previousState = {
    toppings: movedIngredients,
    bun: addedBunIngredient,
  };

  expect(reducer(previousState, resetBurgerIngredients())).toEqual({
    toppings: [],
  });
});
