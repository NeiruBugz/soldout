import React from "react";
import block from "bem-cn";
import "./index.scss";

const b = block("progress-dot");

const ProgressDot = ({color}) => (
  <span className={b({ color })}>&nbsp;</span>
);

export default ProgressDot;
