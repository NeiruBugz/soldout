import React from "react";
import styles from "./styles/Visualiser.module.sass";
export const Visualizer: React.FC<{}> = () => (
  <img alt="" className={styles.visualizer} src="/visualizer.gif" />
);
