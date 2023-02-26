import React from "react";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../services";

import styles from "../burger-constructor.module.css";

interface BurgerConstructorEmptyStateProps {
  isDragging: boolean;
}

function BurgerConstructorEmptyState(props: BurgerConstructorEmptyStateProps) {
  const { isDragging } = props;
  const { toppings, bun } = useAppSelector(
    (store: RootState) => store.burgerConstructor
  );

  const isIngredient = toppings.length || bun;

  return (
    <>
      {(isDragging || !isIngredient) && (
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
