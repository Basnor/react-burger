import React from "react";
import type { CSSProperties } from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { Identifier } from "dnd-core";

import IngredientItem from "../burger-ingredients/components/ingredient-item";
import ToppingItem from "../burger-constructor/components/topping-item";
import { DragType } from "../../utils/types";

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
  itemType: Identifier|null,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let transform;

  switch (itemType) {
    case DragType.Ingredient:
      transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
      break;

    case DragType.Topping:
      transform = `translate(${initialOffset.x}px, ${currentOffset.y}px)`;
      break;
  }

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
      case DragType.Ingredient:
        return <IngredientItem ingredient={item} amount={undefined} />;

      case DragType.Topping:
        return <ToppingItem ingredient={item.ingredient} index={item.index} />;

      default:
        return null;
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(itemType, initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
}

export default CustomDragLayer;
