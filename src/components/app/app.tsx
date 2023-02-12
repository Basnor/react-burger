import React from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { IngredientsContext } from "../../services/appContext";
import { INGREDIENTS_URL } from "../../utils/contants";
import { IIngredient } from "../../utils/types";
import useFetch from "../../hooks/useFetch";

function App() {
  const {
    isLoading,
    data: ingredients,
    error,
  } = useFetch<IIngredient>(INGREDIENTS_URL);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        {!error && !isLoading && (
          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
