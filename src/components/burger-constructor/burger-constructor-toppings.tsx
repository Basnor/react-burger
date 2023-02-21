import React from "react";

import styles from "./burger-constructor.module.css";
import { IngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import DraggableTopingItem from "./draggable-topping-item";

function BurgerConstructorToppings() {
  const toppings = useAppSelector(
    (store: RootState) => store.burgerConstructor.ingredients
  ).filter(({ type }) => type !== IngredientType.Bun);

  return (
    <ul className={styles.toppings}>
      {toppings &&
        toppings.map((ingredient) => {
          return (
            <li key={ingredient.uid} className={styles.topping}>
              <DraggableTopingItem ingredient={ingredient} />
            </li>
          );
        })}
    </ul>
  );
}

export default BurgerConstructorToppings;
