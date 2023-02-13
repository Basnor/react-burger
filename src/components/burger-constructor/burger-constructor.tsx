import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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
import { IngredientsContext } from "../../services/appContext";
import useFetch from "../../hooks/useFetch";
import { ORDERS_API_URL } from "../../utils/contants";
import {
  IIngredient,
  IngredientType,
  IOrder,
  IResponse,
} from "../../utils/types";

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
    price: number
  }
};

const totlPriceInitialState : TotalPriceStateProps = { price: 0 }; 

function totalPriceReducer(state: TotalPriceStateProps, action: TotalPriceActionProps) {
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
  const data = useContext<IIngredient[]>(IngredientsContext);

  const { post } = useFetch<IResponse & IOrder>(ORDERS_API_URL);
  const [orderNumber, setOrderNumber] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totlPriceInitialState);

  const ingredients = useMemo(() => {
    return data.filter(({ _id }) => _id === "60d3b41abdacab0026a733c6" || _id === "60d3b41abdacab0026a733c8" || _id === "60d3b41abdacab0026a733cd");
  }, [data]);

  const bun = useMemo(() => {
    return ingredients.find(({ type }) => (type as IngredientType) === IngredientType.Bun);
  }, [ingredients]);

  const toppings = useMemo(() => {
    return ingredients.filter(({ type }) => type !== IngredientType.Bun);
  }, [ingredients]);

  useEffect(() => {
    totalPriceDispatcher({ type: Action.CLEAR });

    ingredients.map(({ type, price }) => {
      totalPriceDispatcher({ type: Action.ADD, payload: { type, price } });
    });
  }, [ingredients]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const createOrder = () => {
    const postOrder = async () => {
      try {
        const response = await post({
          ingredients: ingredients.map(({ _id }) => {
            return _id;
          }),
        });

        setOrderNumber(response.order.number);

        handleModalOpen();
      } catch (e: any) {
        console.log(e);
      }
    };

    postOrder();
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

export default BurgerConstructor;
