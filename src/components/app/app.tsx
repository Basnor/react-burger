import React, { useEffect, useState } from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { IngredientsContext } from "../../services/appContext";
import { INGREDIENTS_URL } from "../../utils/contants";
import { IIngredient, IResponse } from "../../utils/types";
import useFetch from "../../hooks/useFetch";

function App() {
  const { get } = useFetch<IResponse & { data: IIngredient[] }>(INGREDIENTS_URL);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await get();

        setIngredients(response.data);
      } catch(e: any) {
        console.log(e);
      }
    }

    getIngredients();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        {!!ingredients.length && (
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
