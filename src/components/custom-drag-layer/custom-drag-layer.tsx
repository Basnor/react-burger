import React from "react";
import type { CSSProperties } from "react";
import { useDragLayer, XYCoord } from "react-dnd";

import BurgerIngredientsItem from "../burger-ingredients/burger-ingredients-item";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    transform,
  };
}

function CustomDragLayer() {
  const { item, itemType, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    })
  );

  function renderItem() {
    switch (itemType) {
      case "ingredient":
        return <BurgerIngredientsItem ingredient={item} amount={undefined} />;

      default:
        return null;
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
}

export default CustomDragLayer;
