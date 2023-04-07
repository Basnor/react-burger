import React, { useRef } from "react";

import styles from "./burger-ingredients.module.css";
import { IngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks";
import BurgerIngredientsTabs from "./components/burger-ingredients-tabs";
import draggable from "./components/draggable";
import IngredientItem from "./components/ingredient-item";

export type IngredientTypeProps = {
  name: string;
  value: IngredientType;
};

const availableIngredientTabs: IngredientTypeProps[] = [
  {
    name: "Булки",
    value: IngredientType.Bun,
  },
  {
    name: "Соусы",
    value: IngredientType.Sause,
  },
  {
    name: "Начинки",
    value: IngredientType.Main,
  },
];

const DraggableIngredientItem = draggable(IngredientItem);

function BurgerIngredients() {
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const { ingredients, error } = useAppSelector((store) => store.burgerIngredients);

  const filteredIngredients = (type: IngredientType) => {
    if (error) {
      return [];
    }

    return ingredients.filter((ingredient) => ingredient.type === type);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <BurgerIngredientsTabs
        ingredientTypes={availableIngredientTabs}
        observableRef={ingredientsRef}
      />

      <div ref={ingredientsRef} className={styles.ingredients}>
        {availableIngredientTabs.map((type) => {
          return (
            <section id={type.value} key={type.value}>
              <h2 className="text text_type_main-medium">{type.name}</h2>

              <div className={`${styles.group} mr-4 ml-4 mt-6 mb-10`}>
                {filteredIngredients(type.value).map((ingredient) => {
                  return (
                    <DraggableIngredientItem
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
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

export default React.memo(BurgerIngredients);
