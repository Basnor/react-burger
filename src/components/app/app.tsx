import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../../pages/home";
import Feed from "../../pages/feed";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Logout from "../../pages/logout";
import ErrorPage from "../../pages/error-page";
import BaseLayout from "../base-layout/base-layout";
import ProtectedRoute, { Role } from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileDetails from "../profile-details/profile-details";
import { ROUTES } from "../../utils/contants";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ROUTES.INGREDIENT,
            element: <IngredientDetails />,
          },
        ]
      },
      {
        path: ROUTES.FEED,
        element: <Feed />,
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRoute role={Role.USER}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ROUTES.PROFILE,
            element: <ProfileDetails />,
          },
          {
            path: ROUTES.ORDERS,
            element: null,
          },
          {
            path: ROUTES.LOGOUT,
            element: <Logout />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
