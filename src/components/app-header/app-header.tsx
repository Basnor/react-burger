import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import AppHeaderButton from "./app-header-button";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.links} style={{ textAlign: "start" }}>
          <li className={styles.link}>
            <Link to="/" style={{ display: "contents" }}>
              <AppHeaderButton
                name="Конструктор"
                icon={<BurgerIcon type="primary" />}
                extraClass="mr-2"
                style={{
                  color: "white",
                }}
              />
            </Link>
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
            <Link to="/" style={{ display: "contents" }}>
              <Logo />
            </Link>
          </li>
        </ul>
        <ul className={styles.links} style={{ textAlign: "end" }}>
          <li className={styles.link}>
            <Link to="/profile" style={{ display: "contents" }}>
              <AppHeaderButton
                name="Личный кабинет"
                icon={<ProfileIcon type="primary" />}
                style={{
                  color: "white",
                }}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
