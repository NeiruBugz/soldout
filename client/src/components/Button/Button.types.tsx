import React, {ButtonHTMLAttributes} from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
}