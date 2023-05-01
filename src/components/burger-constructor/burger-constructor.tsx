import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";

import styles from "./burger-constructor.module.css";
import BurgerConstructorBuns from "./components/burger-constructor-buns";
import { DragType, IIngredient } from "../../utils/types";
import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import BurgerConstructorToppings from "./components/burger-constructor-toppings";
import { addBurgerIngredient, resetBurgerIngredients, selectConstructorIngredients } from "../../features/burger-constructor/burger-constructor-slice";
import { createOrder } from "../../features/create-order/create-order-slice";
import BurgerConstructorPrice from "./components/burger-constructor-price";
import BurgerConstructorEmptyState from "./components/burger-constructor-empty-state";
import { ROUTES } from "../../utils/contants";
import { getCookie } from "../../utils/cookie";
import { getUser } from "../../services/slices/user";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const navigate = useNavigate();

  const { orderDetails, request } = useAppSelector((store) => store.createOrder);
  const { user } = useAppSelector((store) => store.user);
  const constructorIngredients = useAppSelector((store) => selectConstructorIngredients(store.burgerConstructor));

  useEffect(() => {
    if (!getCookie("accessToken")) {
      return;
    }

    dispatch(getUser());
  }, [dispatch]);

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
    if (!user) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
      return;
    }

    const ids = {
      ingredients: constructorIngredients.map(({ _id }) => {
        return _id;
      }),
    };

    dispatch(createOrder(ids));
  };

  useEffect(() => {
    if (!orderDetails) {
      return;
    }

    dispatch(resetBurgerIngredients());
  }, [request]);

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
          {!!constructorIngredients.length && (
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
