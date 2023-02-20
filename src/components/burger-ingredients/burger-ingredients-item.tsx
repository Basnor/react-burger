import React, { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export interface BurgerIngredientsItemProps {
  ingredient: any;
  amount?: number;
}

function BurgerIngredientsItem(props: BurgerIngredientsItemProps) {
  const { ingredient, amount } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.item} onClick={handleModalOpen}>
        {amount && <Counter count={amount} size="default" extraClass="m-1" />}
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
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredientsItem;
