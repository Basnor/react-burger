import React, { CSSProperties, ReactNode } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface AppHeaderButtonProps {
  name: string;
  icon: ReactNode;
  link?: string;
  disabled?: boolean;
  style?: CSSProperties;
  extraClass?: string;
}

const defaultAppHeaderButtonProps: AppHeaderButtonProps = {
  name: "",
  icon: "default",
  disabled: false,
  style: {},
  extraClass: "",
};

function AppHeaderButton(props: AppHeaderButtonProps) {
  const { name, icon, disabled, style, extraClass } = props;

  return (
    <Button
      disabled={disabled}
      htmlType="button"
      type="secondary"
      size="large"
      style={{
        ...style,
        display: "inline-flex",
      }}
      extraClass={`${extraClass} pl-5 pr-4 pb-5 pt-4 mb-4 mt-4`}
    >
      {icon}
      <span className="pl-2">{name}</span>
    </Button>
  );
}

AppHeaderButton.defaultProps = defaultAppHeaderButtonProps;

export default AppHeaderButton;
