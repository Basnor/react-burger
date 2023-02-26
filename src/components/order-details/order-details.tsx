import React from "react";

import styles from "./order-details.module.css";
import done from "../../images/done.svg";

interface OrderDetailsProps {
  number: number;
}

export function OrderDetails(props: OrderDetailsProps) {
  const {
    number
  } = props;

  return (
    <div className={`${styles.details} pl-25 pr-25`}>
      <h1 className={`${styles.number} text text_type_digits-large mt-30 mb-8`}>
        {number}
      </h1>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <img src={done} className={styles.done} alt="Заказ подтвержден" />
      <h2 className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </h2>
      <span className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}
