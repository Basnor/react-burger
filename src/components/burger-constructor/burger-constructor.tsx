import React from "react";
import { useDrop } from "react-dnd";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";

import styles from "./burger-constructor.module.css";
import BurgerConstructorBuns from "./components/burger-constructor-buns";
import { DragType, IIngredient } from "../../utils/types";
import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import BurgerConstructorToppings from "./components/burger-constructor-toppings";
import { addBurgerIngredient } from "../../services/burger-constructor";
import { createOrder } from "../../services/order-details";
import BurgerConstructorPrice from "./components/burger-constructor-price";
import BurgerConstructorEmptyState from "./components/burger-constructor-empty-state";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/contants";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const navigate = useNavigate();

  const { request } = useAppSelector((store: RootState) => store.orderDetails);
  const { toppings, bun } = useAppSelector((store: RootState) => store.burgerConstructor);

  const [{ isDragging }, dropRef] = useDrop({
    accept: DragType.Ingredient,
    collect: (monitor) => ({
      isDragging: monitor.canDrop(),
    }),
    drop: (ingredient: IIngredient) =>
      dispatch(
        addBurgerIngredient({
          ingredient: {
            ...ingredient,
            uid: nanoid(),
          },
        })
      ),
  });

  const handleCreateOrder = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });

    const buns = bun ? [bun, bun] : [];
    const ingredients = [...toppings, ...buns];
    const ids = {
      ingredients: ingredients.map(({ _id }) => {
        return _id;
      }),
    };

    dispatch(createOrder(ids));
  };

  return (
    <>
      <div
        className={`${styles.wrapper} ml-4 mr-4 mt-25`}
        ref={dropRef}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={styles.layers}>
          <BurgerConstructorBuns>
            <BurgerConstructorToppings />
          </BurgerConstructorBuns>
          {(toppings.length || bun) && (
            <div className={`${styles.pricing} mt-10 mr-8`}>
              <BurgerConstructorPrice />
              <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="ml-10"
                onClick={handleCreateOrder}
                disabled={request}
              >
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
        <BurgerConstructorEmptyState isDragging={isDragging} />
      </div>
    </>
  );
}

export default React.memo(BurgerConstructor);
