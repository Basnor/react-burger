import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";

function ForgotPassword() {
  const [value, setValue] = useState({
    email: "",
  });

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <EmailInput
        extraClass="mt-6"
        name={"email"}
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        placeholder="Укажите e-mail"
        value={value.email}
      />
      <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">
        Восстановить
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

export default ForgotPassword;
