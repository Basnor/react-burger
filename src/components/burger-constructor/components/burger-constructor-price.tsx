import React, { useEffect, useReducer } from "react";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../services";

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

function BurgerConstructorPrice() {
  const { toppings, bun } = useAppSelector(
    (store: RootState) => store.burgerConstructor
  );
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    totalPriceReducer,
    totlPriceInitialState
  );

  useEffect(() => {
    totalPriceDispatcher({ type: Action.CLEAR });

    toppings.map(({ price }) => {
      totalPriceDispatcher({ type: Action.ADD_TOPPINGS, payload: { price } });
    });

    totalPriceDispatcher({
      type: Action.ADD_BUNS,
      payload: { price: bun?.price || 0 },
    });
  }, [toppings, bun]);

  return (
    <>
      <span className="text text_type_digits-medium mr-2">
        {totalPriceState.price}
      </span>
      <CurrencyIcon type="primary" />
    </>
  );
}

export default BurgerConstructorPrice;
