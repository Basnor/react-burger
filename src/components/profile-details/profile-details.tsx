import React, { useEffect, useMemo } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector } from "../../hooks";
import useForm from "../../hooks/useForm";
import { getValuable, isObjectEmpty } from "../../utils/helpers";
import { updateUser } from "../../services/slices/user";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../../utils/contants";

export function ProfileDetails() {
  const dispatch = useAppDispatch();
  
  const { user, request } = useAppSelector((store) => store.user);

  const { values, setValues, handleChange, handleSubmit } = useForm({
    initialState: {
      name: "",
      email: "",
      password: "",
    },
    handleSubmit: () => {
      dispatch(updateUser(changedValues));
    },
    isValid: (values) => {
      return NAME_REGEX.test(values.name) && EMAIL_REGEX.test(values.email) && PASSWORD_REGEX.test(values.password);
    },
  });

  const changedValues = useMemo(() => {
    const changes = {
      name: values.name !== user?.name ? values.name : null,
      email: values.email !== user?.email ? values.email : null,
      password: values.password || null,
    };

    return getValuable(changes);
  }, [values])

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
      onSubmit={handleSubmit}
      onReset={() => resetFormChanges()}
    >
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        extraClass="mb-4"
        placeholder="Имя"
        disabled={request}
        autoComplete="off"
      />
      <EmailInput
        name="email"
        value={values.email}
        onChange={handleChange}
        isIcon={false}
        extraClass="mb-4"
        disabled={request}
        autoComplete="off"
      />
      <PasswordInput
        name="password"
        value={values.password}
        onChange={handleChange}
        extraClass="mb-4"
        disabled={request}
        autoComplete="off"
      />
      <div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={request || isObjectEmpty(changedValues)}
        >
          Сохранить
        </Button>
        <Button
          htmlType="reset"
          type="primary"
          extraClass="ml-3"
          size="medium"
          disabled={isObjectEmpty(changedValues)}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}

export default ProfileDetails;
