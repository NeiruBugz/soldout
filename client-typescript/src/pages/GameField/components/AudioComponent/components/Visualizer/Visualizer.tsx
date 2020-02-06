import React from 'react';
import styles from './Visualiser.module.sass';
import visualizer from './assets/visualizer.gif';

export const Visualizer: React.FC = () => (
  <img alt="" className={styles.visualizer} src={visualizer} />
);
