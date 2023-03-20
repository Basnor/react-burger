import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./reset-password.module.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../services";
import useForm from "../hooks/useForm";
import { resetPassword } from "../services/reset-password";
import { PASSWORD_REGEX, ROUTES } from "../utils/contants";

interface IResetPasswordForm {
  password: string
  token: string
}

function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { request, error, success } = useAppSelector((store: RootState) => store.resetPassword);
  const {
    values,
    handleChange,
    handleSubmit,
    isValid,
  } = useForm<IResetPasswordForm>({
    initialState: {
      password: '',
      token: '',
    },
    handleSubmit: (values) => dispatch(resetPassword(values)),
    isValid: (values) => {
      return PASSWORD_REGEX.test(values.password) && !!values.token
    }
  });

  useEffect(() => {
    if (!success) {
      return;
    }

    navigate(ROUTES.HOME);
  }, [success]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput
        extraClass="mt-6"
        icon="ShowIcon"
        name="password"
        onChange={handleChange}
        placeholder="Введите новый пароль"
        value={values.password}
        disabled={request}
      />
      <Input
        extraClass="mt-6"
        name="token"
        onChange={handleChange}
        placeholder="Введите код из письма"
        size="default"
        type="text"
        value={values.token}
        disabled={request}
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        extraClass="mt-6"
        disabled={!isValid || request}
      >
        Сохранить
      </Button>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to={ROUTES.LOGIN} className={styles.link}>
          Войти
        </Link>
      </span>
    </form>
  );
}

export default ResetPassword;
