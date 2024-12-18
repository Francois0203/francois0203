import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useLoading } from "../context/LoadingContext";
import Calendar from "../components/Calendar"; // Import the Calendar component

const Home = () => {
  const { setIsLoading } = useLoading(); // Access the loading context
  const [showBookings, setShowBookings] = useState(false); // Toggle for Bookings tab

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

  const toggleBookings = () => {
    setShowBookings((prev) => !prev); // Toggle the visibility of the Bookings tab
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <p className={styles.description}>
        Explore the website using the navigation bar.
      </p>
      <div className={styles.dropdown}>
        <button className={styles.dropdownButton} onClick={toggleBookings}>
          Bookings ▼
        </button>
        {showBookings && (
          <div className={styles.dropdownContent}>
            <Calendar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;