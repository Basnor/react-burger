import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIngredients } from "../../services/burger-ingredients";
import CustomDragLayer from "../custom-drag-layer/custom-drag-layer";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { RootState } from "../../services";
import { clearIngredientDetails } from "../../services/ingredient-details";
import { OrderDetails } from "../order-details/order-details";
import { clearOrderDetails } from "../../services/order-details";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredient : ingredientDetails } = useAppSelector((store: RootState) => store.ingredientDetails);
  const { orderDetails } = useAppSelector((store: RootState) => store.orderDetails);

  const clearIngredientDetils = () => {
    dispatch(clearIngredientDetails());
  }

  const clearOrderDetils = () => {
    dispatch(clearOrderDetails());
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
          <CustomDragLayer />
        </DndProvider>
      </main>
      {ingredientDetails && (
        <Modal onClose={clearIngredientDetils}>
          <IngredientDetails />
        </Modal>
      )}
      {orderDetails && (
        <Modal onClose={clearOrderDetils}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
