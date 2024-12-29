import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useLoading } from "../context/LoadingContext";

const Home = () => {
  const { setIsLoading } = useLoading(); // Access the loading context

  useEffect(() => {
    const simulateLoading = async () => {
      setIsLoading(true); // Start the loading animation
      try {
        if (process.env.NODE_ENV === "development") {
          // Simulate a 2 second loading in development
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          // In production, loading will happen based on data fetching
          // No need to simulate, loading will be triggered by actual data fetching
        }
      } catch (error) {
        console.error("Error simulating Home data load:", error);
      } finally {
        setIsLoading(false); // Stop the loading animation
      }
    };

    simulateLoading();
  }, [setIsLoading]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <p className={styles.description}>
        Explore the website using the navigation bar.
      </p>
    </div>
  );
};

export default Home;