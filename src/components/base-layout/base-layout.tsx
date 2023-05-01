import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearOrderDetails } from "../../features/create-order/create-order-slice";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import CreateOrder from "../../features/create-order/create-order";
import { getIngredients } from "../../services/ingredients";

function BaseLayout() {
  const dispatch = useAppDispatch();
  
  const { orderDetails } = useAppSelector((store) => store.createOrder);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Outlet />
      {orderDetails && (
        <Modal onClose={() => dispatch(clearOrderDetails())}>
          <CreateOrder />
        </Modal>
      )}
    </>
  );
}

export default BaseLayout;
