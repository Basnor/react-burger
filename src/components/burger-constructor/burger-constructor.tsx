import React, { useEffect, useReducer } from "react";
import { useDrop } from "react-dnd";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";

import styles from "./burger-constructor.module.css";
import BurgerConstructorBuns from "./components/burger-constructor-buns";
import { DragType, IIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import BurgerConstructorToppings from "./components/burger-constructor-toppings";
import { addBurgerIngredient } from "../../services/burger-constructor";
import { createOrder } from "../../services/order-details";

enum Action {
  ADD_BUNS = "ADD_BUNS",
  ADD_TOPPINGS = "ADD_TOPPINGS",
  CLEAR = "CLEAR",
}

type TotalPriceStateProps = {
  price: number;
};

type TotalPriceActionProps = {
  type: Action;
  payload?: {
    price: number;
  };
};

const totlPriceInitialState: TotalPriceStateProps = { price: 0 };

function totalPriceReducer(
  state: TotalPriceStateProps,
  action: TotalPriceActionProps
) {
  switch (action.type) {
    case Action.ADD_BUNS:
      if (!action.payload) {
        return { price: state.price };
      }

      return { price: state.price + action.payload.price * 2 };

    case Action.ADD_TOPPINGS:
      if (!action.payload) {
        return { price: state.price };
      }

      return { price: state.price + action.payload.price };

    case Action.CLEAR:
      return totlPriceInitialState;

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const dispatch = useAppDispatch();

  const { toppings, bun } = useAppSelector((store: RootState) => store.burgerConstructor);
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    totalPriceReducer,
    totlPriceInitialState
  );

  const [, dropRef] = useDrop({
    accept: DragType.Ingredient,
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

  useEffect(() => {
    totalPriceDispatcher({ type: Action.CLEAR });

    toppings.map(({ price }) => {
      totalPriceDispatcher({ type: Action.ADD_TOPPINGS, payload: { price } });
    });

    totalPriceDispatcher({ type: Action.ADD_BUNS, payload: { price: bun?.price || 0 } });
  }, [toppings, bun]);

  const handleCreateOrder = () => {
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
      <div className={`${styles.wrapper} ml-4 mr-4 mt-25`} ref={dropRef}>
        <div className={styles.layers}>
          <BurgerConstructorBuns>
            <BurgerConstructorToppings />
          </BurgerConstructorBuns>

        </div>
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
              onClick={handleCreateOrder}
            >
              Оформить заказ
            </Button>
          </div>
      </div>
    </>
  );
}

export default React.memo(BurgerConstructor);
