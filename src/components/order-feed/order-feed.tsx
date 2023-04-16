import React from "react";

import styles from "./order-feed.module.css";
import OrderFeedItem from "../order-feed-item/order-feed-item";
import { useAppSelector } from "../../hooks";

function OrderFeed() {
  const orders = useAppSelector((state) => state.feed.orders);

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <ul className={`${styles.orders} pr-2`}>
        {orders.map((order) => (
          <li key={order._id}>
            <OrderFeedItem order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderFeed;
