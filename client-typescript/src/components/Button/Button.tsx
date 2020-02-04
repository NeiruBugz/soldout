import React from "react";

type ButtonProps = {
  label: string | number;
  subLabel?: string | number;
  classes: string;
  onClick?: any;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  subLabel,
  classes = "",
  onClick
}) => {
  return (
    <button onClick={onClick} className={classes}>
      <label>{label}</label>
      {subLabel && <label>{subLabel}</label>}
    </button>
  );
};
