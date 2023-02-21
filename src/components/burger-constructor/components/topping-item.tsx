import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burger-constructor.module.css";
import { IIngredient } from "../../../utils/types";

export interface ToppingItemProps {
  ingredient: IIngredient & { uid: string };
  index: number;
}

function ToppingItem(props: ToppingItemProps) {
  const { ingredient } = props;

  return (
    <div className={styles.topping}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="mr-2"
      />
    </div>
  );
}

export default ToppingItem;
