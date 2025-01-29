// pages/Home.js
import React from "react";
import styles from "./Home.module.css";
import useBackend from "../utils/useBackend";
import LoadingScreen from "../components/LoadingScreen";

const Home = ({ requiresBackend = false }) => {
  const { isBackendLoading, isBackendReady } = useBackend();

  // Show loading screen only if this page requires the backend and it's still loading
  if (requiresBackend && isBackendLoading) {
    return <LoadingScreen />;
  }

  if (requiresBackend && !isBackendReady) {
    return <p>Backend is not ready. Please try again later.</p>;
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