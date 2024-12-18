// LoadingIcon.js
import React from 'react';
import styles from './LoadingIcon.module.css';

const LoadingIcon = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Fetching resources, please wait...</p>
    </div>
  );
};

export default LoadingIcon;