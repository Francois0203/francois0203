import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingScreen.module.css";
import useBackend from "../utils/useBackend"; // Importing the custom hook

const LoadingIcon = () => {
  const [fadeOut, setFadeOut] = useState(false); // State to trigger fade-out effect
  const bubbleContainerRef = useRef(null); // Reference to the bubble container
  const { loading } = useBackend(); // Using the custom hook to check backend status

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
    generateBubbles();

    // Cleanup bubbles when component unmounts
    const cleanupBubbles = () => {
      if (bubbleContainerRef.current) {
        while (bubbleContainerRef.current.firstChild) {
          bubbleContainerRef.current.removeChild(bubbleContainerRef.current.firstChild);
        }
      }
    };

    // Perform cleanup on unmount
    return cleanupBubbles;
  }, []);

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
        <div className={styles.bubbleContainer} ref={bubbleContainerRef}></div>
      </div>
    );
  }

  // If backend is ready, return null or an empty container to show the page
  return null;
};

export default LoadingIcon;