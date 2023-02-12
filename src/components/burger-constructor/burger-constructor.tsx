import React, { useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import BurgerConstructorBuns from "./burger-constructor-buns";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { IIngredient, IngredientType } from "../../utils/types";
import { IngredientsContext } from "../../services/appContext";

function reducer(
  state: { price: number },
  action: { type: string; payload?: { type: IngredientType; price: number } }
) {
  switch (action.type) {
    case "add":
      if (!action.payload) {
        return { price: state.price };
      }

      if (action.payload.type === IngredientType.Bun) {
        return { price: state.price + action.payload.price * 2 };
      }

      return { price: state.price + action.payload.price };

    case 'clear':
      return { price: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const data = useContext<IIngredient[]>(IngredientsContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, {
    price: 0
  });

  const ingredients = useMemo(
    () => data.filter(
      ({ _id }) =>
      _id === "60d3b41abdacab0026a733c6" ||
      _id === "60d3b41abdacab0026a733c8" ||
      _id === "60d3b41abdacab0026a733cd"
    ),
    [data]
  );

  const bun = ingredients.find(
    ({ type }) => (type as IngredientType) === IngredientType.Bun
  );
  const toppings = ingredients.filter(({ type }) => type !== IngredientType.Bun);

  useEffect(() => {
    totalPriceDispatcher({ type: "clear" });

    ingredients.map(({ type, price }) => {
      totalPriceDispatcher({ type: "add", payload: { type, price } });
    });
  }, [ingredients]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`${styles.wrapper} ml-4 mr-4 mt-25`}>
        <div className={styles.layers}>
          <BurgerConstructorBuns ingredient={bun}>
            <ul className={styles.toppings}>
              {toppings.map((ingredient) => {
                return (
                  <li key={ingredient._id} className={styles.topping}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      extraClass="mr-2"
                    />
                  </li>
                );
              })}
            </ul>
          </BurgerConstructorBuns>

          <div className={`${styles.pricing} mt-10 mb-10 mr-4`}>
            <span className="text text_type_digits-medium mr-2">
              {totalPriceState.price}
            </span>
            <CurrencyIcon type="primary" />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              extraClass="ml-10"
              onClick={handleModalOpen}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
