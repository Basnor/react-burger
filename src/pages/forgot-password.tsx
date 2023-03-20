import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password.module.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../services";
import useForm from "../hooks/useForm";
import { forgotPassword } from "../services/forgot-password";
import { EMAIL_REGEX, ROUTES } from "../utils/contants";

interface IForgotPasswordForm {
  email: string
}

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    
  const { request, success } = useAppSelector((store: RootState) => store.forgotPassword);
  const {
    values,
    handleChange,
    handleSubmit,
    isValid,
  } = useForm<IForgotPasswordForm>({
    initialState: {
      email: '',
    },
    handleSubmit: async (values) => dispatch(forgotPassword(values)),
    isValid: (values) => {
      return EMAIL_REGEX.test(values.email);
    }
  });

  useEffect(() => {
    if (!success) {
      return;
    }

    navigate(ROUTES.RESET_PASSWORD);
  }, [success]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Восстановлеsние пароля</h1>
      <EmailInput
        extraClass="mt-6"
        name={"email"}
        onChange={handleChange}
        placeholder="Укажите e-mail"
        value={values.email}
        disabled={request}
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        extraClass="mt-6"
        disabled={!isValid || request}
      >
        Восстановить
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

export default ForgotPassword;
