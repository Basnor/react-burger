import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burger-ingredients.module.css";
import { useAppDispatch } from "../../../hooks";
import { initIngredientDetails } from "../../../services/ingredient-details";

export interface IngredientItemProps {
  ingredient: any;
  amount?: number;
}

function IngredientItem(props: IngredientItemProps) {
  const { ingredient, amount } = props;
  
  const dispatch = useAppDispatch();
  const initDetails = () => {
    dispatch(initIngredientDetails({ ingredient }));
  };

  return (
    <>
      <div className={styles.item} onClick={initDetails}>
        {amount && <Counter count={amount} size="default" extraClass="m-1" />}
        <img
          src={ingredient.image}
          className="pl-4 pr-4"
          alt={ingredient.name}
        />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
    </>
  );
}

export default IngredientItem;
