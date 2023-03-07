import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { getIngredients } from "../../services/burger-ingredients";
import { clearIngredientDetails } from "../../services/ingredient-details";
import { clearOrderDetails } from "../../services/order-details";

const router = createBrowserRouter([
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
  }
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredientDetails } = useAppSelector((store: RootState) => store.ingredientDetails);
  const { orderDetails } = useAppSelector((store: RootState) => store.orderDetails);

  return (
    <div className={styles.app}>
      <AppHeader />
      <RouterProvider router={router} />
      {ingredientDetails && (
        <Modal onClose={() => dispatch(clearIngredientDetails())}>
          <IngredientDetails />
        </Modal>
      )}
      {orderDetails && (
        <Modal onClose={() => dispatch(clearOrderDetails())}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
