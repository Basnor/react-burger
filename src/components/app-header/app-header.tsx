import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderButton from "./app-header-button";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.links} style={{ textAlign: "start" }}>
          <li className={styles.link}>
            <AppHeaderButton
              name="Конструктор"
              icon={<BurgerIcon type="primary" />}
              extraClass="mr-2"
              style={{
                color: "white",
              }}
            />
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
            <Logo />
          </li>
        </ul>
        <ul className={styles.links} style={{ textAlign: "end" }}>
          <li className={styles.link}>
            <AppHeaderButton
              disabled
              name="Личный кабинет"
              icon={<ProfileIcon type="secondary" />}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
