import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileSidebar from "../components/profile-sidebar/profile-sidebar";
import OrderDetails from "../components/order-details/order-details";
import { useAppDispatch } from "../hooks";
import { connect, disconnect } from "../services/feed";
import { getCookie } from "../utils/cookie";
import { ORDERS_URL } from "../utils/contants";

function Profile() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { orderId } = useParams<{ orderId?: string }>();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    
    dispatch(connect(`${ORDERS_URL}?token=${accessToken?.replace('Bearer ', '')}`));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <>
      {!orderId || state?.backgroundLocation ? (
        <main className={styles.wrapper}>
          <ProfileSidebar />
          <Outlet />
        </main>
      ) : (
        <div className={styles.order}>
          <OrderDetails />
        </div>
      )}
    </>
  );
}

export default Profile;
