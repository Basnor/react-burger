import React, { useEffect, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { useAppDispatch } from "../../../hooks";
import { moveBurgerIngredient } from "../../../services/burger-constructor";
import { IIngredient } from "../../../utils/types";
import { ToppingItemProps } from "./topping-item";

// eslint-disable-next-line react/display-name
const draggable = (WrappedComponent: React.ElementType<ToppingItemProps>) => (props: ToppingItemProps) => {
  const { ingredient, index } = props;

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<{ ingredient: IIngredient, index: number }>({
    accept: "topping",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Определяем границы карточки ингредиента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Определяем середину карточки по оси Y нашего ингредиента
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Получаем текущую позицию курсора, относительно текущего контейнера
      const clientOffset = monitor.getClientOffset();

      // Вычисляем координаты курсора и координаты середины карточки на которую мы навели наш перетаскиваемый ингредиент
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Условие для перетаскивании элементов сверху вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Условие для перетаскивании элементов снизу вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        moveBurgerIngredient({
          dragIndex,
          hoverIndex,
        })
      );

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "topping",
    item: () => ({ ingredient, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const preventDefault = (e: any) => e.preventDefault();

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} onDrop={preventDefault}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default draggable;
