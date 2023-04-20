import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./feed.module.css";
import { useAppDispatch } from "../hooks";
import OrderFeed from "../components/order-feed/order-feed";
import OrderFeedStats from "../components/order-feed-stats/order-feed-stats";
import { connect, disconnect } from "../services/feed";
import Modal from "../components/modal/modal";
import { ALL_ORDERS_URL, ROUTES } from "../utils/contants";

function Feed() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { orderId } = useParams<{ orderId?: string }>();

  useEffect(() => {
    dispatch(connect({url: ALL_ORDERS_URL}));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  const handleModalClose = () => {
    navigate(state?.backgroundLocation?.pathname || ROUTES.FEED, {replace: true});
  }

  return (
    <main className={styles.wrapper}>
      {state?.backgroundLocation ? (
        <>
          <OrderFeed />
          <OrderFeedStats />
          {orderId && (
            <Modal onClose={handleModalClose}>
              <Outlet />
            </Modal>
          )}
        </>
      ) : (
        <>
          {!orderId ? (
            <>
              <OrderFeed />
              <OrderFeedStats />
            </> 
          ) : (
            <div className={styles.order}>
              <Outlet />
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Feed;
