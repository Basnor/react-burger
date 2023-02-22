import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { IngredientItemProps } from "./ingredient-item";
import { DragType } from "../../../utils/types";

// eslint-disable-next-line react/display-name
const draggable = (WrappedComponent: React.ElementType<IngredientItemProps>) => (props: IngredientItemProps) => {
  const { ingredient } = props;

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: DragType.Ingredient,
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
      <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <WrappedComponent {...props} />
      </div>
    </>
  );
}

export default draggable;
