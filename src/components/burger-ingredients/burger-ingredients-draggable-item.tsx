import React, { useEffect } from "react";

import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import BurgerIngredientsItem, { BurgerIngredientsItemProps } from "./burger-ingredients-item";

function BurgerIngredientsDraggableItem(props: BurgerIngredientsItemProps) {
  const { ingredient } = props;

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: "ingredient",
      item: ingredient,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <div ref={dragRef} style={{ opacity: isDragging ? 0 : 1 }}>
        <BurgerIngredientsItem {...props} />
      </div>
    </>
  );
}

export default BurgerIngredientsDraggableItem;
