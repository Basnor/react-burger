import React, { useState } from "react";

interface inputParams<T> {
  initialState: T;
  isValid?: (values: T) => boolean;
  handleSubmit?: (values: T) => void;
}

interface outputParams<T> {
  values: T;
  isValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
}

function useForm<T>(params: inputParams<T>): outputParams<T> {
  const {
    initialState,
    isValid,
    handleSubmit,
  } = params;

  const [values, setValues] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });
  };

  return {
    values,
    isValid: isValid ? isValid(values) : true,
    handleChange,
    handleSubmit: (e) => {
      e.preventDefault();

      if (handleSubmit) {
        handleSubmit(values);
      }
    },
    setValues,
  };
}

export default useForm;
