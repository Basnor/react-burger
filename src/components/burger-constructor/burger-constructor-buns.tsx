import React, { ReactNode } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientType } from "../../utils/types";
import { RootState } from "../../services";
import { useAppSelector } from "../../hooks";

interface BurgerConstructorBunsProps {
  children: ReactNode;
}

function BurgerConstructorBuns(props: BurgerConstructorBunsProps) {
  const { children } = props;

  const bun = useAppSelector(
    (store: RootState) => store.burgerConstructorReducer.chosenIngredients
  ).find(({ type }) => (type as IngredientType) === IngredientType.Bun);

  return bun ? (
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass="ml-8 mr-2"
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass="ml-8 mr-2"
      />
    </>
  ) : (
    <>{children}</>
  );
}

export default BurgerConstructorBuns;
