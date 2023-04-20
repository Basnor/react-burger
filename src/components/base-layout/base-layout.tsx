import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearOrderDetails } from "../../services/order-details";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderStatus from "../order-status/order-satus";
import { getIngredients } from "../../services/burger-ingredients";

function BaseLayout() {
  const dispatch = useAppDispatch();
  
  const { orderDetails } = useAppSelector((store) => store.orderDetails);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Outlet />
      {orderDetails && (
        <Modal onClose={() => dispatch(clearOrderDetails())}>
          <OrderStatus />
        </Modal>
      )}
    </>
  );
}

export default BaseLayout;
