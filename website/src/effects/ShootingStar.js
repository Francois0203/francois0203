import { useEffect, useRef } from "react";
import styles from "./ShootingStar.module.css"; 

const ShootingStarEffect = () => {
  const starContainerRef = useRef(null);

  // Function to generate a single random shooting star
  const generateStar = () => {
    const container = starContainerRef.current;
    if (!container) return;

    // Random size for the shooting star
    const starWidth = Math.random() * 4 + 2; // Random width between 2px and 6px
    const starLength = Math.random() * 100 + 50; // Random length between 50px and 150px

    // Random starting position (from top-left to bottom-right diagonal)
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    // Random animation duration (speed)
    const animationDuration = Math.random() * 2 + 1; // Random duration between 1s and 3s

    // Create the shooting star element
    const star = document.createElement("div");
    star.classList.add(styles.star);
    star.style.width = `${starWidth}px`;
    star.style.height = `${starLength}px`;
    star.style.top = `${startY}%`;
    star.style.left = `${startX}%`;
    star.style.animationDuration = `${animationDuration}s`;

    // Append star to container
    container.appendChild(star);

    // Remove the star after it completes the animation
    setTimeout(() => {
      container.removeChild(star);
    }, animationDuration * 1000); // Duration in milliseconds
  };

  // Effect hook to generate stars at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const randomStarCount = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // Random count between 3 and 8
      for (let i = 0; i < randomStarCount; i++) {
        generateStar();
      }
    }, 800); // Generate new stars every 0.8 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div className={styles.starContainer} ref={starContainerRef}></div>;
};

export default ShootingStarEffect;