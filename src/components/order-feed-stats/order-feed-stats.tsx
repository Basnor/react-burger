import React from "react";

import styles from "./order-feed-stats.module.css";
import { useAppSelector } from "../../hooks";
import { OrderStatus } from "../../utils/types";

function OrderFeedStats() {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  return (
    <div className={`${styles.wrapper} mt-25`}>
      <div className={styles.status}>
        <h2 className="text text_type_main-medium">Готовы:</h2>
        <ul className={styles.done}>
          {orders && orders.slice(0, 20).map((order, index) => {
            if (order.status === OrderStatus.Done) {
              return (
                <li
                  key={index}
                  className={`${styles.done} text text_type_digits-default`}
                >
                  {order.number}
                </li>
              );
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium">В работе:</h2>
        <ul className={styles.list}>
          {orders.map((order) => {
            if (order.status === OrderStatus.Crerated) {
              return (
                <li key={order._id} className="text text_type_digits-default">
                  {order.number}
                </li>
              );
            }
          })}
        </ul>
      </div>
      <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
      <p className={`${styles.counter} text text_type_digits-large`}>
        {total}
      </p>
      <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
      <p className={`${styles.counter} text text_type_digits-large`}>
        {totalToday}
      </p>
    </div>
  );
}

export default OrderFeedStats;
