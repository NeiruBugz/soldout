import React from 'react';
import { Props } from './Button.types';

export const Button: React.FC<Props> = ({ label, subLabel, ...props }) => (
  <button {...props}>
    <label>{label}</label>
    {subLabel && <label>{subLabel}</label>}
  </button>
);
