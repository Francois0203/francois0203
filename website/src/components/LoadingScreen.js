import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";
import useBackend from "../utils/useBackend"; // Importing the custom hook
import BubbleEffect from "../effects/Bubble"; // Importing the BubbleEffect component

const LoadingIcon = () => {
  const [fadeOut, setFadeOut] = useState(false); // State to trigger fade-out effect
  const { loading } = useBackend(); // Using the custom hook to check backend status

  // When backend is ready, trigger fade-out effect
  useEffect(() => {
    if (!loading) {
      setFadeOut(true); // Trigger fade-out after backend is ready
    }
  }, [loading]);

  // If backend is still loading, display loading message
  if (loading) {
    return (
      <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ""}`}>
        <div className={styles.spinnerContainer}>
          <div className={styles.mainSpinner}>
            <span className={styles.segment}></span>
            <span className={styles.segment}></span>
            <span className={styles.segment}></span>
          </div>
          <p className={styles.message}>Fetching magic, hold tight...</p>
        </div>
        <BubbleEffect /> {/* Add the BubbleEffect here */}
      </div>
    );
  }

  // If backend is ready, return null or an empty container to show the page
  return null;
};

export default LoadingIcon;