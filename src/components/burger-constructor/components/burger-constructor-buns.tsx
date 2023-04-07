import React, { ReactNode } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../../hooks";

interface BurgerConstructorBunsProps {
  children: ReactNode;
}

function BurgerConstructorBuns(props: BurgerConstructorBunsProps) {
  const { children } = props;

  const bun = useAppSelector((store) => store.burgerConstructor.bun);

  return bun ? (
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass="ml-8 mr-2"
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass="ml-8 mr-2"
      />
    </>
  ) : (
    <>{children}</>
  );
}

export default BurgerConstructorBuns;
