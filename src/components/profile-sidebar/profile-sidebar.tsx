import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./profile-sidebar.module.css";

function ProfileSidebar() {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/profile"
              end
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              style={({ isActive }) =>
                isActive ? { color: "#F2F2F3" } : undefined
              }
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              end
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              style={({ isActive }) =>
                isActive ? { color: "#F2F2F3" } : undefined
              }
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              className={`${styles.button} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </button>
          </li>
        </ul>
      </nav>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfileSidebar;
