import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../../pages/home";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/ingredients/:ingredientId",
            element: <IngredientDetails />,
          },
        ]
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <ProtectedRoute role={Role.GUEST}>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute role={Role.USER}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/profile",
            element: <ProfileDetails />,
          },
          {
            path: "/profile/orders",
            element: null,
          },
          {
            path: "/profile/logout",
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
