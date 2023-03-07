import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";

function Register() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input
        error={false}
        extraClass="mt-6"
        name={"name"}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        placeholder={"Имя"}
        type={"text"}
        value={value.name}
      />
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
        Зарегистрироваться
      </Button>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&nbsp;
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </span>
    </form>
  );
}

export default Register;
