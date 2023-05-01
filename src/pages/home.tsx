import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./home.module.css";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import CustomDragLayer from "../components/custom-drag-layer/custom-drag-layer";
import Modal from "../components/modal/modal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearIngredientDetails, initIngredientDetails } from "../services/slices/ingredients";
import { ROUTES } from "../utils/contants";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { ingredients, ingredientDetails } = useAppSelector((store) => store.ingredients);
  const { ingredientId } = useParams<{ ingredientId?: string }>();

  useEffect(() => {
    if (!ingredientId) {
      return;
    }

    dispatch(initIngredientDetails({ ingredientId }));

    return () => {
      dispatch(clearIngredientDetails());
    };
  }, [ingredients, ingredientId]);

  const handleModalClose = () => {
    navigate(state?.backgroundLocation?.pathname || ROUTES.HOME, {replace: true});
  }

  return (
    <main className={styles.wrapper}>
      {state?.backgroundLocation ? (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            <CustomDragLayer />
          </DndProvider>
          {ingredientDetails && (
            <Modal onClose={handleModalClose}>
              <Outlet />
            </Modal>
          )}
        </>
      ) : (
        <>
          {!ingredientDetails ? (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
              <CustomDragLayer />
            </DndProvider>
          ) : (
            <div className={styles.ingredient}>
              <Outlet />
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Home;
