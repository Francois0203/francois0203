import React from "react";
import styles from "./LoadingIcon.module.css";

const LoadingIcon = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.pulsatingBackground}></div>
      <div className={styles.spinnerContainer}>
        <div className={styles.mainSpinner}>
          <span className={styles.segment}></span>
          <span className={styles.segment}></span>
          <span className={styles.segment}></span>
        </div>
        <p className={styles.message}>Fetching magic, hold tight...</p>
      </div>
    </div>
  );
};

export default LoadingIcon;