import React, { useEffect, useRef } from "react";
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import useForm from "../../hooks/useForm";
import { getValuable } from "../../utils/helpers";
import { updateUser } from "../../services/user";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../../utils/contants";

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
    if (user) {
      resetFormChanges();
    }
  }, [user]);

  return (
    <form
      ref={profileForm}
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

export default ProfileDetails;
