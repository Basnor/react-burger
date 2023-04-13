import React, { useEffect } from "react";

import styles from "./feed.module.css";
import { useAppDispatch } from "../hooks";
import FeedList from "../components/feed-list/feed-list";
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
      <FeedList />
    </main>
  );
}

export default Feed;
