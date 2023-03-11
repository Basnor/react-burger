import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { getIngredients } from "../../services/burger-ingredients";
import { clearIngredientDetails } from "../../services/ingredient-details";
import { clearOrderDetails } from "../../services/order-details";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BaseLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredientDetails } = useAppSelector((store: RootState) => store.ingredientDetails);
  const { orderDetails } = useAppSelector((store: RootState) => store.orderDetails);

  return (
    <>
      <AppHeader />
      <Outlet />
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
    </>
  );
}

export default BaseLayout;
