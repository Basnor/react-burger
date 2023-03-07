import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login.module.css";

function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <EmailInput
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        value={value.email}
        name={"E-mail"}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={(e) => setValue({ ...value, password: e.target.value })}
        value={value.password}
        name={"Пароль"}
        icon="ShowIcon"
        extraClass="mt-6"
      />
      <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">
        Войти
      </Button>

      <span className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?&nbsp;
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?&nbsp;
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
}

export default Login;
