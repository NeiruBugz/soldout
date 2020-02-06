import React from "react";
import "./ProgressDot.sass";
import {Props} from "./ProgressDot.types";

export const ProgressDot: React.FC<Props> = ({color}) => <span
    className={`progress-dot progress-dot_color_${color}`}>&nbsp;</span>;
