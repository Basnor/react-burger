import React, { useEffect } from "react";

import styles from "./feed.module.css";
import { useAppDispatch } from "../hooks";
import OrderFeed from "../components/order-feed/order-feed";
import OrderFeedStats from "../components/order-feed-stats/order-feed-stats";
import { connect, disconnect } from "../services/feed";

function Feed() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <main className={styles.wrapper}>
      <OrderFeed />
      <OrderFeedStats />
    </main>
  );
}

export default Feed;
