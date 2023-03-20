import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login.module.css";
import { useAppDispatch, useAppLocation, useAppSelector } from "../hooks";
import { RootState } from "../services";
import useForm from "../hooks/useForm";
import { login } from "../services/auth";
import { EMAIL_REGEX, ROUTES } from "../utils/contants";

interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useAppLocation();
  
  const { request, user } = useAppSelector((store: RootState) => store.auth);
  const { values, handleChange, handleSubmit, isValid } = useForm<ILoginForm>({
    initialState: {
      email: "",
      password: "",
    },
    handleSubmit: (values) => dispatch(login(values)),
    isValid: (values) => {
      return EMAIL_REGEX.test(values.email);
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    navigate(location?.state?.from || ROUTES.HOME);
  }, [user]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <EmailInput
        extraClass="mt-6"
        name={"email"}
        onChange={handleChange}
        placeholder={"E-mail"}
        value={values.email}
        disabled={request}
      />
      <PasswordInput
        extraClass="mt-6"
        icon="ShowIcon"
        name={"password"}
        onChange={handleChange}
        placeholder={"Пароль"}
        value={values.password}
        disabled={request}
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        extraClass="mt-6"
        disabled={!isValid || request}
      >
        Войти
      </Button>

      <span className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?&nbsp;
        <Link to={ROUTES.REGISTER} className={styles.link}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?&nbsp;
        <Link to={ROUTES.FORGOT_PASSWORD} className={styles.link}>
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
}

export default Login;
