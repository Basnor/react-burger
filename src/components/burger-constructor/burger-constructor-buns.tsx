import React, { ReactNode } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient } from "../../utils/types";

interface BurgerConstructorBunsProps {
  ingredient: IIngredient | undefined;
  children: ReactNode;
}

function BurgerConstructorBuns(props: BurgerConstructorBunsProps) {
  const { ingredient, children } = props;

  return ingredient ? (
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredient.name} (верх)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="ml-8 mr-2"
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${ingredient.name} (низ)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="ml-8 mr-2"
      />
    </>
  ) : (
    <>{children}</>
  );
}

export default BurgerConstructorBuns;
