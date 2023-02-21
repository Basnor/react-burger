import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { IngredientItemProps } from "./ingredient-item";

// eslint-disable-next-line react/display-name
const draggable = (WrappedComponent: React.ElementType<IngredientItemProps>) => (props: IngredientItemProps) => {
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
        <WrappedComponent {...props} />
      </div>
    </>
  );
}

export default draggable;
