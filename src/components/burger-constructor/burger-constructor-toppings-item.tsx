import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../utils/types";

function BurgerConstructorToppingsItem(props: {
  ingredient: IIngredient & {uid: string};
}) {
  const { ingredient } = props;

  return (
    <>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="mr-2"
      />
    </>
  );
}

export default BurgerConstructorToppingsItem;
