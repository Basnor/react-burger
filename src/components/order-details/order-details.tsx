import React from "react";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-details.module.css";
import { useAppSelector } from "../../hooks";
import { getDay, getTime } from "../../utils/helpers";
import { OrderStatus } from "../../utils/types";

function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const ingredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const orders = useAppSelector((store) => store.feed.orders);

  const order = orders?.find(({ _id }) => _id === orderId);
  const orderIngredients = ingredients.filter((ingredient) => order?.ingredients.includes(ingredient._id));
  const orderPrice = orderIngredients.reduce((totalPrice, { price }) => totalPrice + price, 0);
  const uniqueOrderIngredients = orderIngredients.filter((ingredient, index) => {
    return orderIngredients.indexOf(ingredient) === index;
  });

  return order ? (
    <div className={styles.wrapper}>
      <span className={`${styles.number} text text_type_digits-default mb-10`}>#{order?.number}</span>
      <h1 className="text text_type_main-medium mb-3">
        {order.name}
      </h1>
      <span className={`${styles.status} text text_type_main-default mb-15`}>
        {order.status === OrderStatus.Done ? "Выполнен" : "Готовится"}
      </span>
      <h1 className="text text_type_main-medium mb-6">
        Состав:
      </h1>
      <ul className={styles.ingredients}>
        {uniqueOrderIngredients.map((ingredient) => (
          <li className={styles.ingredient} key={ingredient._id}>
            <img
              className={styles.image}
              src={ingredient.image_mobile}
              alt={ingredient.name}
            />
            <h2 className={`${styles.name} text_type_main-default`}>
              {ingredient.name}
            </h2>
            <span className={`${styles.price} text text_type_digits-default`}>
              {`${orderIngredients?.filter(({ _id }) => _id === ingredient._id).length} x ${ingredient.price}`}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>
      <div className={`${styles.total}`}>
        <span className="text text_type_main-default text_color_inactive">
          {`${getDay(order.createdAt)}, ${getTime(order.createdAt)}`}
        </span>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderDetails;
