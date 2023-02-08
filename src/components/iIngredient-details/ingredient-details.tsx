import React from "react";

import styles from "./ingredient-details.module.css";
import { IIngredient } from "../../utils/types";

interface IngredientDetailsProps {
  ingredient: IIngredient;
}

function IngredientDetails(props: IngredientDetailsProps) {
  const { ingredient } = props;

  const details = [
    {
      name: "Калории,ккал",
      value: ingredient?.calories,
    },
    {
      name: "Белки, г",
      value: ingredient?.proteins,
    },
    {
      name: "Жиры, г",
      value: ingredient?.fat,
    },
    {
      name: "Углеводы, г",
      value: ingredient?.carbohydrates,
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
          src={ingredient?.image_large}
          alt={ingredient?.name}
        />
        <h2 className={`${styles.name} text text_type_main-medium mt-4`}>{ingredient?.name}</h2>
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
