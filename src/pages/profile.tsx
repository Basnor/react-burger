import React, { useEffect, useRef } from "react";
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import styles from "./profile.module.css";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../utils/contants";
import useForm from "../hooks/useForm";
import { RootState } from "../services";
import { getUser, updateUser } from "../services/user";
import { getValuable } from "../utils/helpers";
import { logout } from "../services/auth";

export function ProfileDetails() {
  const dispatch = useAppDispatch();
  const profileForm = useRef<HTMLFormElement>(null);
  
  const { user, request } = useAppSelector((store: RootState) => store.user);

  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialState: {
      name: "",
      email: "",
      password: "",
    },
    handleSubmit: () => {
      const changedValues = {
        name: values.name !== user?.name ? values.name : null,
        email: values.email !== user?.email ? values.email : null,
        password: values.password || null,
      };

      const valuableValues = getValuable(changedValues);
      
      dispatch(updateUser(valuableValues));
    },
    isValid: (values) => {
      return NAME_REGEX.test(values.name) && EMAIL_REGEX.test(values.email) && PASSWORD_REGEX.test(values.password);
    },
  });

  const resetFormChanges = () => {
    setValues({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  useEffect(() => {
    resetFormChanges();
  }, [user]);

  return (
    <form
      ref={profileForm}
      className={styles.form}
      onSubmit={handleSubmit}
      onReset={() => resetFormChanges()}
    >
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        extraClass="m-2"
        placeholder="Имя"
        disabled={request}
        onBlur={(e) => {
          e?.target.form?.requestSubmit();
        }}
      />
      <EmailInput
        name="email"
        value={values.email}
        onChange={handleChange}
        isIcon={false}
        extraClass="m-2"
        disabled={request}
        onBlur={(e) => {
          e?.target.form?.requestSubmit();
        }}
      />
      <PasswordInput
        name="password"
        value={values.password}
        onChange={handleChange}
        extraClass="m-2"
        disabled={request}
        onBlur={(e) => {
          e?.target.form?.requestSubmit();
        }}
      />
    </form>
  );
}

function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store: RootState) => store.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUser());
  }, [user]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.sidebar}>
        <nav className={styles.navigation}>
          <ul className={styles.links}>
            <li>
              <NavLink
                to="/profile"
                end
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) =>
                  isActive ? { color: "#F2F2F3" } : undefined
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                end
                className={`${styles.link} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) =>
                  isActive ? { color: "#F2F2F3" } : undefined
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                className={`${styles.button} text text_type_main-medium text_color_inactive`}
                onClick={handleLogout}
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </main>
  );
}

export default Profile;
