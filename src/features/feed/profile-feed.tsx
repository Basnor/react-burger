import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./profile-feed.module.css";
import Modal from "../../components/modal/modal";
import OrderFeedItem from "../../components/order-feed-item/order-feed-item";
import { useAppSelector } from "../../hooks";
import { ROUTES } from "../../utils/contants";

function ProfileFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { orderId } = useParams<{ orderId?: string }>();
  const orders = useAppSelector((state) => state.feed.orders);

  const handleModalClose = () => {
    navigate(state?.backgroundLocation?.pathname || ROUTES.ORDERS, {replace: true});
  }

  return (
    <div className={styles.wrapper}>
      <ul className={`${styles.orders} pr-2`}>
        {orders?.length ? (
          [...orders].reverse().map((order) => (
            <li key={order._id}>
              <OrderFeedItem order={order} />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      {orderId && state?.backgroundLocation && (
        <Modal onClose={handleModalClose}>
          <Outlet />
        </Modal>
      )}
    </div>
  );
}

export default ProfileFeed;
