import React, { useEffect, useRef } from "react";

import { useDrag, useDrop, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { moveBurgerIngredient } from "../../services/burger-constructor";
import { IIngredient } from "../../utils/types";
import BurgerConstructorToppingsItem from "./burger-constructor-toppings-item";

function DraggableTopingItem(props: { ingredient: IIngredient  & {uid: string} }) {
  const { ingredient } = props;

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const ingredients = useAppSelector(
    (store: RootState) => store.burgerConstructor.ingredients
  );

  const [, drop] = useDrop<IIngredient & {uid: string}>({
    accept: "topping",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredients.indexOf(item);
      const hoverIndex = ingredients.indexOf(ingredient);

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        moveBurgerIngredient({
          newIndex: hoverIndex,
          oldIndex: dragIndex,
        })
      );
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "topping",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  drag(drop(ref));

  return (
    <>
      <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <BurgerConstructorToppingsItem {...props} />
      </div>
    </>
  );
}

export default DraggableTopingItem;