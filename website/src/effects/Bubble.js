import { useEffect, useRef } from "react";
import styles from "./Bubble.module.css"; // Adjusted path to the CSS file

const BubbleEffect = () => {
  const bubbleContainerRef = useRef(null);

  // Function to generate a single random bubble
  const generateBubble = () => {
    const container = bubbleContainerRef.current;
    if (!container) return;

    // Set random size for each bubble (both width and height)
    const randomSize = Math.random() * 60 + 10; // Random size between 10px and 70px

    // Set random opacity for each bubble
    const opacity = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8

    // Set random animation duration (speed)
    const animationSpeed = Math.random() * 5 + 3; // Random animation duration between 3 and 8 seconds

    // Set random position for the bubbles within the container (percentage based)
    const xPosition = Math.random() * 100;  // Random X position (0% to 100%)
    const yPosition = Math.random() * 100;  // Random Y position (0% to 100%)

    // Create bubble element and apply styles
    const bubble = document.createElement("div");
    bubble.classList.add(styles.bubble);
    bubble.style.width = `${randomSize}px`;
    bubble.style.height = `${randomSize}px`;
    bubble.style.left = `${xPosition}%`;
    bubble.style.top = `${yPosition}%`;
    bubble.style.opacity = opacity;
    bubble.style.animationDuration = `${animationSpeed}s`;

    // Append bubble to container
    container.appendChild(bubble);

    // Remove the bubble after 5 seconds
    setTimeout(() => {
      container.removeChild(bubble);
    }, 5000); // Bubble life cycle (5 seconds)
  };

  // Effect hook to generate bubbles at a constant interval
  useEffect(() => {
    const bubbleInterval = () => {
      const randomBubbleCount = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Random number between 5 and 15
      for (let i = 0; i < randomBubbleCount; i++) {
        generateBubble();
      }
    };

    // Bubble generation interval: Random bubbles every 0.6 seconds
    const interval = setInterval(bubbleInterval, 600);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return <div className={styles.bubbleContainer} ref={bubbleContainerRef}></div>;
};

export default BubbleEffect;