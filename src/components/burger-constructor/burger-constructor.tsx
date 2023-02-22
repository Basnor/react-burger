import React, { useEffect, useReducer, useState } from "react";
import { useDrop } from "react-dnd";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from 'nanoid';

import styles from "./burger-constructor.module.css";
import BurgerConstructorBuns from "./components/burger-constructor-buns";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { DragType, IIngredient, IngredientType } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import BurgerConstructorToppings from "./components/burger-constructor-toppings";
import { addBurgerIngredient } from "../../services/burger-constructor";

enum Action {
  ADD = "ADD",
  CLEAR = "CLEAR",
}

type TotalPriceStateProps = {
  price: number;
};

type TotalPriceActionProps = {
  type: Action;
  payload?: {
    type: IngredientType;
    price: number;
  };
};

const totlPriceInitialState: TotalPriceStateProps = { price: 0 };

function totalPriceReducer(
  state: TotalPriceStateProps,
  action: TotalPriceActionProps
) {
  switch (action.type) {
    case Action.ADD:
      if (!action.payload) {
        return { price: state.price };
      }

      if (action.payload.type === IngredientType.Bun) {
        return { price: state.price + action.payload.price * 2 };
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

  const { toppings } = useAppSelector((store: RootState) => store.burgerConstructor);

  const [orderNumber, setOrderNumber] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

    toppings.map(({ type, price }) => {
      totalPriceDispatcher({ type: Action.ADD, payload: { type, price } });
    });
  }, [toppings]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const createOrder = () => {
    const postOrder = async () => {
      try {
        // const response = await post({
        //   ingredients: ingredients.map(({ _id }) => {
        //     return _id;
        //   }),
        // });

        //setOrderNumber(response.order.number);

        handleModalOpen();
      } catch (e: any) {
        console.log(e);
      }
    };

    postOrder();
  };

  return (
    <>
      <div className={`${styles.wrapper} ml-4 mr-4 mt-25`} ref={dropRef}>
        <div className={styles.layers}>
          <BurgerConstructorBuns>
            <BurgerConstructorToppings />
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
              onClick={createOrder}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && orderNumber && (
        <Modal onClose={handleModalClose}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerConstructor);
