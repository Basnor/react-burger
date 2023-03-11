import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../services";
import useForm from "../hooks/useForm";
import { register } from "../services/register";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../utils/contants";

interface IRegisterForm {
  name: string
  email: string
  password: string
}

function Register() {
  const dispatch = useAppDispatch();
  const { user, request, error } = useAppSelector((store: RootState) => store.register);

  const { values, handleChange, handleSubmit, isValid } = useForm<IRegisterForm>({
    initialState: {
      name: '',
      email: '',
      password: ''
    },
    handleSubmit: (values) => dispatch(register(values)),
    isValid: (values) => {
      return NAME_REGEX.test(values.name) && EMAIL_REGEX.test(values.email) && PASSWORD_REGEX.test(values.password);
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input
        error={false}
        extraClass="mt-6"
        name={"name"}
        onChange={handleChange}
        placeholder={"Имя"}
        type={"text"}
        value={values.name}
        disabled={request}
      />
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
