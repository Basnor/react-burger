import React from "react";

import styles from "./feed-list.module.css";
import { useAppSelector } from "../../hooks";
import FeedItem from "./components/feed-item";
import { IFeed } from "../../utils/types";

function FeedList() {
  const feeds = useAppSelector((state) => state.feed.feeds);

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <ul className={`${styles.feeds} pr-2`}>
        {feeds.map((feed: IFeed) => (
          <li key={feed._id}>
            <FeedItem feed={feed as any} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedList;
