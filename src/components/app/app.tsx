import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIngredients } from "../../services/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { RootState } from "../../services";
import { clearIngredientDetails } from "../../services/ingredient-details";
import { OrderDetails } from "../order-details/order-details";
import { clearOrderDetails } from "../../services/order-details";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";

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
