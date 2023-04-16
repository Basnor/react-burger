export enum IngredientType {
  Bun = "bun",
  Sause = "sauce",
  Main = "main",
}

export enum DragType {
  Ingredient = "ingredient",
  Topping = "topping"
}

export enum OrderStatus {
  Done = "done",
  Pending = "pending",
  Crerated = "created",
}

export interface IIngredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IOrder {
  name: string;
  order: {
    number: number;
  }
}

export interface IUser {
  email: string;
  name: string;
}

export interface IOrderFeedItem {
  _id: string,
  ingredients: string[],
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}

export interface IOrderFeed {
  orders: IOrderFeedItem[],
  total: number,
  totalToday: number
}

export interface IResponse {
  success: boolean;
}
