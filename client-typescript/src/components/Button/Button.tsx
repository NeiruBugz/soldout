import React from "react";

type ButtonProps = {
  label: string | number;
  subLabel?: string | number;
  className: string;
  onClick?: () => {};
};

export const Button: React.FC<ButtonProps> = ({ label, subLabel, className, onClick }) => {
  return (
    <button onClick={onClick}>
      <label>{label}</label>
      {subLabel && <label>{subLabel}</label>}
    </button>
  );
};
