import React from "react";

import { useAppSelector } from "../../../hooks";
import { selectConstructorIngredients } from "../../../features/burger-constructor/burger-constructor-slice";
import styles from "../burger-constructor.module.css";

interface BurgerConstructorEmptyStateProps {
  isDragging: boolean;
}

function BurgerConstructorEmptyState(props: BurgerConstructorEmptyStateProps) {
  const { isDragging } = props;
  const constructorIngredients = useAppSelector((store) => selectConstructorIngredients(store.burgerConstructor));

  return (
    <>
      {(isDragging || !constructorIngredients.length) && (
        <div className={styles.empty}>
          <span className="text text_type_main-medium">
            Перетащи сюда!
          </span>
        </div>
      )}
    </>
  );
}

export default BurgerConstructorEmptyState;
