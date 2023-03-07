import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
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
        extraClass="mt-6"
        name={"email"}
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        placeholder={"E-mail"}
        value={value.email}
      />
      <PasswordInput
        extraClass="mt-6"
        icon="ShowIcon"
        name={"password"}
        onChange={(e) => setValue({ ...value, password: e.target.value })}
        placeholder={"Пароль"}
        value={value.password}
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
