import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burger-ingredients.module.css";
import { useAppDispatch, useAppLocation, useAppSelector } from "../../../hooks";
import { RootState } from "../../../services";
import { initIngredientDetails } from "../../../services/burger-ingredients";

export interface IngredientItemProps {
  ingredient: any;
  preview?: boolean;
}

function IngredientItem(props: IngredientItemProps) {
  const { ingredient, preview } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useAppLocation();

  const {toppings, bun} = useAppSelector((store: RootState) => store.burgerConstructor);

  const initDetails = () => {
    dispatch(initIngredientDetails({ ingredientId: ingredient._id }));

    navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location }});
  };

  const amount = useMemo(() => {
    const buns = bun ? [bun, bun] : [];
    
    return [...toppings, ...buns].filter(({_id}) => _id === ingredient._id).length;
  }, [toppings, bun])

  return (
    <>
      <div className={styles.item} onClick={initDetails} role={preview ? 'IngrerdientPreview' : 'Ingrerdient'}>
        {!preview && amount > 0 && <Counter count={amount} size="default" extraClass="m-1" />}
        <img
          src={ingredient.image}
          className="pl-4 pr-4"
          alt={ingredient.name}
        />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
    </>
  );
}

export default IngredientItem;
