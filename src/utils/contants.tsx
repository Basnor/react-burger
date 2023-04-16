export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const NAME_REGEX = /^.{6,}$/;
export const PASSWORD_REGEX = /^.{6,}$/;

// 7 days
export const COOKIE_LIFETIME_SEC = 7 * 24 * 60 * 60;

export const BASE_URL = "https://norma.nomoreparties.space/api";
export const ENDPOINTS = {
  INGREDIENTS: "/ingredients",
  ORDERS: "/orders",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER: "/auth/user",
  TOKEN: "/auth/token",
  FORGOT: "/password-reset",
  RESET: "/password-reset/reset",
};

export const ROUTES = {
  HOME: "/",
  INGREDIENT: "/ingredients/:ingredientId",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/profile",
  ORDERS: "/profile/orders",
  LOGOUT: "/profile/logout",
  FEED: "/feed",
  ORDER: "/feed/:orderId",
};
