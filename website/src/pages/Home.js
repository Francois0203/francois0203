import React from "react";
import styles from "./Home.module.css";
import useBackend from "../utils/useBackend"; // Import the backend check hook
import LoadingScreen from "../components/LoadingScreen"; // Import the LoadingScreen component

const Home = () => {
  const { loading, isBackendReady } = useBackend(); // Get backend status and loading state

  if (loading) {
    return <LoadingScreen />; // Show the custom loading screen while backend is loading
  }

  if (!isBackendReady) {
    return <p>Backend is not ready. Please try again later.</p>; // Show this message if backend is not ready
  }

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