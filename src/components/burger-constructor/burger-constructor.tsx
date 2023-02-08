import React, { ReactNode } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { IIngredient, IngredientType } from "../../utils/types";
import { INGREDIENTS_URL } from "../../utils/contants";
import useFetch from "../../hooks/useFetch";

function BurgerConstructorBuns(props: { ingredient: IIngredient|undefined; children: ReactNode; }) {
  const { ingredient, children } = props;

  return (
      ingredient
      ? <>
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
      : <>{children}</>
  );
}

function BurgerConstructor() {
  const { isLoading, data, error } = useFetch<IIngredient>(INGREDIENTS_URL);
  
  return (
    <div className={`ml-4 mr-4 mt-25 ${styles.wrapper}`}>
      <div className={styles.layers}>
        <BurgerConstructorBuns ingredient={data.find(({type}) => type as IngredientType === IngredientType.Bun)}>
          <ul className={styles.toppings}>
            {data.filter(({type}) => type !== IngredientType.Bun).map((ingredient) => {
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
        </BurgerConstructorBuns>

        <div className={`mt-10 mb-10 mr-4 ${styles.pricing}`}>
          <span className="text text_type_digits-medium mr-2">12390</span>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10"
          >
            Нажми на меня
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructor;
