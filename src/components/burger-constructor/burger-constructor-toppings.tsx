import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { IngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../services";

function BurgerConstructorToppings() {
  const toppings = useAppSelector(
    (store: RootState) => store.burgerConstructorReducer.chosenIngredients
  ).filter(({ type }) => type !== IngredientType.Bun);

  return (
    <ul className={styles.toppings}>
      {toppings &&
        toppings.map((ingredient) => {
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
  );
}

export default BurgerConstructorToppings;
