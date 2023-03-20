import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import AppHeaderButton from "./app-header-button";
import { ROUTES } from "../../utils/contants";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.links} style={{ textAlign: "start" }}>
          <li className={styles.link}>
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active} text text_type_main-medium`
                  : `${styles.link} text text_type_main-medium`
              }
            >
              <AppHeaderButton
                name="Конструктор"
                icon={<BurgerIcon type="primary" />}
                extraClass="mr-2"
              />
            </NavLink>
          </li>
          <li className={styles.link}>
            <AppHeaderButton
              disabled
              name="Лента заказов"
              icon={<ListIcon type="secondary" />}
            />
          </li>
        </ul>
        <ul className={styles.links} style={{ textAlign: "center" }}>
          <li className={styles.link}>
            <Link to={ROUTES.HOME} style={{ display: "contents" }}>
              <Logo />
            </Link>
          </li>
        </ul>
        <ul className={styles.links} style={{ textAlign: "end" }}>
          <li className={styles.link}>
            <NavLink
              to={ROUTES.PROFILE}
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active} text text_type_main-medium`
                  : `${styles.link} text text_type_main-medium`
              }
            >
              <AppHeaderButton
                name="Личный кабинет"
                icon={<ProfileIcon type="primary" />}
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
