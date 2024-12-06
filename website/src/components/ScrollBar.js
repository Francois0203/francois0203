import React from "react";
import styles from "./ScrollBar.module.css";

const ScrollBar = ({ children }) => {
  return <div className={styles.scrollbarContainer}>{children}</div>;
};

export default ScrollBar;