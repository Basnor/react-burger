import React, { useState, useRef } from "react";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import { ingredients } from "../../utils/data";

type ingredientTypeProps = {
  name: string;
  value: string;
};

const ingredientTypes: ingredientTypeProps[] = [
  {
    name: "Булки",
    value: "bun",
  },
  {
    name: "Соусы",
    value: "sauce",
  },
  {
    name: "Начинки",
    value: "main",
  },
];

function IngredientTabs(props: { ingredientTypes: ingredientTypeProps[]; onToggle: (tab: string) => void; }) {
  const { ingredientTypes, onToggle } = props;

  const [current, setCurrent] = useState<string>(ingredientTypes[0].value);

  const handleClick = (tab: string) => {
    setCurrent(tab);
    onToggle(tab);
  };

  return (
    <div className={`mb-10 ${styles.tabs}`}>
      {ingredientTypes.map((tab) => {
        return (
          <Tab
            key={tab.value}
            value={tab.value}
            active={current === tab.value}
            onClick={() => handleClick(tab.value)}
          >
            {tab.name}
          </Tab>
        );
      })}
    </div>
  );
}

function IngredientItem(props: { ingredient: any; amount?: number }) {
  const { ingredient, amount } = props;

  return (
    <div className={styles.item}>
      {amount && <Counter count={amount} size="default" extraClass="m-1" />}
      <img src={ingredient.image} className="pl-4 pr-4" alt={ingredient.name} />
      <div className={`mt-1 mb-1 ${styles.price}`}>
        <span className="text text_type_digits-default mr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
}

function BurgerIngredients() {
  const ingredientsRef = useRef<HTMLDivElement>(null);

  const handleTabToggle = (tab: string) => {
    if (!ingredientsRef.current) {
      return;
    }

    Array.from(ingredientsRef.current.children).find((section) => section.id === tab)?.scrollIntoView();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <IngredientTabs ingredientTypes={ingredientTypes} onToggle={handleTabToggle} />

      <div ref={ingredientsRef} className={styles.ingredients}>
        {ingredientTypes.map((type) => {
          return (
            <section id={type.value} key={type.value}>
              <h2 className="text text_type_main-medium">{type.name}</h2>

              <div className={`mr-4 ml-4 mt-6 mb-10 ${styles.group}`}>
                {ingredients.filter((ingredient) => ingredient.type === type.value).map((ingredient) => {
                    return (
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default BurgerIngredients;
