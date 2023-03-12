export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const NAME_REGEX = /^.{6,}$/;
export const PASSWORD_REGEX = /^.{6,}$/;

// 2 days
export const COOKIE_LIFETIME_SEC = 2 * 24 * 60 * 60;

export const BASE_URL = "https://norma.nomoreparties.space/api";
export const ENDPOINTS = {
  ingredients: "/ingredients",
  orders: "/orders",
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  user: "/auth/user",
  token: "/auth/token",
  forgot: "/password-reset",
  reset: "/password-reset/reset",
};
