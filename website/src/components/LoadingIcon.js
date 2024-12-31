import React, { useContext, useEffect, useRef } from "react";
import styles from "./LoadingIcon.module.css";
import { LoadingContext } from "../context/LoadingContext";

const LoadingIcon = () => {
  const { isLoading } = useContext(LoadingContext);
  const bubbleContainerRef = useRef(null); // Reference to the bubble container

  // Function to generate random bubbles
  const generateBubbles = () => {
    const numberOfBubbles = 20; // Number of bubbles to generate
    for (let i = 0; i < numberOfBubbles; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add(styles.bubble);
      
      // Random size, position, and animation duration
      const size = Math.random() * 30 + 10; // Random size between 10px and 40px
      const left = Math.random() * 100; // Random horizontal position (percentage)
      const animationDuration = Math.random() * 4 + 4; // Random animation duration between 4s and 8s
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${animationDuration}s`;

      // Append bubble to the container
      bubbleContainerRef.current.appendChild(bubble);
    }
  };

  // Generate bubbles when the component is mounted
  useEffect(() => {
    if (isLoading) {
      generateBubbles();
    }

    // Cleanup bubbles when component unmounts or loading changes
    const cleanupBubbles = () => {
      if (bubbleContainerRef.current) {
        while (bubbleContainerRef.current.firstChild) {
          bubbleContainerRef.current.removeChild(bubbleContainerRef.current.firstChild);
        }
      }
    };

    // Perform cleanup on loading state change or unmount
    return cleanupBubbles;
  }, [isLoading]);

  if (!isLoading) {
    return null; // Don't render the loading icon if not in loading state
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.mainSpinner}>
          <span className={styles.segment}></span>
          <span className={styles.segment}></span>
          <span className={styles.segment}></span>
        </div>
        <p className={styles.message}>Fetching magic, hold tight...</p>
      </div>
      <div className={styles.bubbleContainer} ref={bubbleContainerRef}></div>
    </div>
  );
};

export default LoadingIcon;