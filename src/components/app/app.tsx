import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import styles from "./app.module.css";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile, { ProfileDetails } from "../../pages/profile";
import ErrorPage from "../../pages/error-page";
import BaseLayout from "../base-layout/base-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <ProfileDetails />,
          },
          {
            path: "/profile/orders",
            element: null,
          }
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ]
  }
]);

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
