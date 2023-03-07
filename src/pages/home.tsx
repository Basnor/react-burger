import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import CustomDragLayer from "../components/custom-drag-layer/custom-drag-layer";

function Home() {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
        <CustomDragLayer />
      </DndProvider>
    </main>
  );
}

export default Home;
