import React from "react";

import styles from "../burger-constructor.module.css";
import { IngredientType } from "../../../utils/types";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../services";
import draggable from "./draggable";
import ToppingItem from "./topping-item";

const DraggableToppingItem = draggable(ToppingItem);

function BurgerConstructorToppings() {
  const toppings = useAppSelector(
    (store: RootState) => store.burgerConstructor.ingredients
  ).filter(({ type }) => type !== IngredientType.Bun);

  return (
    <ul className={styles.toppings}>
      {toppings &&
        toppings.map((ingredient, index) => {
          return (
            <li key={ingredient.uid}>
              <DraggableToppingItem ingredient={ingredient} index={index} />
            </li>
          );
        })}
    </ul>
  );
}

export default BurgerConstructorToppings;
