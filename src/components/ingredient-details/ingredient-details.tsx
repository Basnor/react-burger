import React from "react";

import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../services";

function IngredientDetails() {
  const { ingredientDetails } = useAppSelector((store: RootState) => store.ingredientDetails);
  const details = [
    {
      name: "Калории,ккал",
      value: ingredientDetails?.calories,
    },
    {
      name: "Белки, г",
      value: ingredientDetails?.proteins,
    },
    {
      name: "Жиры, г",
      value: ingredientDetails?.fat,
    },
    {
      name: "Углеводы, г",
      value: ingredientDetails?.carbohydrates,
    },
  ];

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>
        Детали ингредиента
      </h1>

      <div className={`${styles.details} pl-25 pr-25`}>
        <img
          className="ml-5 mr-5"
          src={ingredientDetails?.image_large}
          alt={ingredientDetails?.name}
        />
        <h2 className={`${styles.name} text text_type_main-medium mt-4`}>
          {ingredientDetails?.name}
        </h2>
        <ul className={`${styles.nutrients} mt-8 mb-15`}>
          {details.map((detail, index) => {
            return (
              <li
                className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
                key={index}
              >
                {detail.name}
                <span className="text text_type_digits-default text_color_inactive">
                  {detail.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;
