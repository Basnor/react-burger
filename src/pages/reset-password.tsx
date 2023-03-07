import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./reset-password.module.css";

function ResetPassword() {
  const [value, setValue] = useState({
    password: "",
    code: "",
  });

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput
        extraClass="mt-6"
        icon="ShowIcon"
        name={"password"}
        onChange={(e) => setValue({ ...value, password: e.target.value })}
        placeholder="Введите новый пароль"
        value={value.password}
      />
      <Input
        error={false}
        extraClass="mt-6"
        name={"name"}
        onChange={(e) => setValue({ ...value, code: e.target.value })}
        placeholder={"Введите код из письма"}
        size={"default"}
        type={"text"}
        value={value.code}
      />
      <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">
        Сохранить
      </Button>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </span>
    </form>
  );
}

export default ResetPassword;
