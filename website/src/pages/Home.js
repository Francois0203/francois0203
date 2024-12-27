import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useLoading } from "../context/LoadingContext";

const Home = () => {
  const { setIsLoading } = useLoading(); // Access the loading context

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading spinner
      try {
        // Simulate fetching data with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with actual fetch if needed
      } catch (error) {
        console.error("Error fetching Home data:", error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchData();
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