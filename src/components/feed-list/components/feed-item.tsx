import React from "react";
import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-item.module.css";
import { useAppLocation, useAppSelector } from "../../../hooks";
import { IFeeds, IResponse } from "../../../utils/types";
import { ROUTES } from "../../../utils/contants";

function inNotUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

// const dateWhen = (date: Date) => {
//   if (isToday(date)) {
//       return 'Сегодня'
//   } else if (isYesterday(date)) {
//       return 'Вчера'
//   } else {
//       return format((date), 'MM.dd.yyyy');
//   }
// }

// const dateFormat = (date: string) => {
//   const options: Intl.DateTimeFormatOptions = {
//       hour: 'numeric',
//       minute: 'numeric',
//       timeZoneName: "short",
//   }

//   return new Date(Date.parse(date)).toLocaleString("ru", options)
// }

// interface FeedItemProps {
//   feeds: IFeed;
// }

function FeedItem(props: any) {
  const { feed } = props;

  const location = useAppLocation();
  const ingredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const orderIngredientsForImage = ingredients.filter((ingredient) =>
    feed.ingredients.includes(ingredient._id)
  );


  //const when = dateWhen(new Date(order.createdAt));

  return (
    <article className={`${styles.item} pt-6 pr-6 pb-6 pl-6`}>
      <Link
        to={ROUTES.HOME}
        className={styles.link}
      >
        <div className={styles.order}>
          <p className="text text_type_digits-default">{feed.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {/* {`${when}, ${dateFormat(order.createdAt)}`} */}
          </p>
        </div>
        <p className={`${styles.text} text text_type_main-medium`}>
          {feed.name}
        </p>
        <div className={styles.order_info}>
          <ul className={styles.list}>
            {orderIngredientsForImage.slice(0, 6).map((item) => (
              <li className={styles.list_item} key={item._id}>
                <img
                  className={styles.list_image}
                  src={item.image_mobile}
                  alt={item.name}
                />
              </li>
            ))}
          </ul>
          {/* <div className={`${styles.price} mt-1 mb-2`}>
            <p className="text text_type_digits-default">{totalOrderPrice}</p>
            <CurrencyIcon type="primary" />
          </div> */}
        </div>
      </Link>
    </article>
  );
}

export default FeedItem;
