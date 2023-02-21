import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burger-constructor.module.css";
import { IIngredient } from "../../../utils/types";
import { useAppDispatch } from "../../../hooks";
import { removeBurgerIngredient } from "../../../services/burger-constructor";

export interface ToppingItemProps {
  ingredient: IIngredient & { uid: string };
  index: number;
}

function ToppingItem(props: ToppingItemProps) {
  const { ingredient } = props;

  const dispatch = useAppDispatch();
  
  const handleRemove = () => {
    dispatch(
      removeBurgerIngredient({
        ingredient
      })
    );
  };

  return (
    <div className={styles.topping}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="mr-2"
        handleClose={() => handleRemove()}
      />
    </div>
  );
}

export default ToppingItem;
