import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { getIngredients } from "../../services/burger-ingredients";
import { clearOrderDetails } from "../../services/order-details";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BaseLayout() {
  const dispatch = useAppDispatch();
  
  const { orderDetails } = useAppSelector((store: RootState) => store.orderDetails);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  
  return (
    <>
      <AppHeader />
      <Outlet />
      {orderDetails && (
        <Modal onClose={() => dispatch(clearOrderDetails())}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BaseLayout;
