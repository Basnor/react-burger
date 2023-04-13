import React from "react";
import { Link } from "react-router-dom";
import { isToday, isYesterday, formatDistanceToNow } from "date-fns";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-feed-item.module.css";
import { useAppLocation, useAppSelector } from "../../../hooks";
import { IOrderFeedItem } from "../../../utils/types";
import { ROUTES } from "../../../utils/contants";

const MAX_DISPLAYED_INGREDIENTS = 6;

const getDay = (date: string) => {
  const ruLocale = require("date-fns/locale/ru");
  const day = new Date(date);

  if (isToday(day)) {
    return "Сегодня";
  }

  if (isYesterday(day)) {
    return "Вчера";
  }

  return formatDistanceToNow(day, { addSuffix: true, locale: ruLocale });
};

const getTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(Date.parse(date)).toLocaleString("ru", options);
};

interface OrderFeedItemProps {
  order: IOrderFeedItem;
}

function OrderFeedItem(props: OrderFeedItemProps) {
  const { order } = props;

  const location = useAppLocation();
  const ingredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const orderIngredients = ingredients.filter((ingredient) => order.ingredients.includes(ingredient._id));
  const orderPrice = orderIngredients.reduce((totalPrice, { price }) => totalPrice + price, 0);

  return (
    <Link to={ROUTES.HOME} className={`${styles.order} pt-6 pr-6 pb-6 pl-6`}>
      <span className="text text_type_digits-default">#{order.number}</span>
      <span className="text text_type_main-default text_color_inactive">
        {`${getDay(order.createdAt)}, ${getTime(order.createdAt)}`}
      </span>
      <p className={`${styles.name} text text_type_main-medium`}>
        {order.name}
      </p>
      <ul className={styles.ingredients}>
        {orderIngredients
          .slice(0, MAX_DISPLAYED_INGREDIENTS)
          .map((ingredient, index) => (
            <li className={styles.ingredient} key={index}>
              <img
                className={styles.image}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
              {index === 0 && orderIngredients.length > MAX_DISPLAYED_INGREDIENTS && (
                <div className={styles.overlay}>
                  <span className="text text_type_main-default">
                    +{orderIngredients.length - MAX_DISPLAYED_INGREDIENTS}
                  </span>
                </div>
              )}
            </li>
          ))}
      </ul>
      <div className={`${styles.price} mt-1 mb-2`}>
        <span className="text text_type_digits-default">{orderPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    </Link>
  );
}

export default OrderFeedItem;
