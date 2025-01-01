import { useState, useEffect } from "react";

const useBackend = () => {
  const [loading, setLoading] = useState(true); // Tracks if the backend is loading
  const [isBackendReady, setIsBackendReady] = useState(false); // Backend readiness state
  const [isFetchingData, setIsFetchingData] = useState(false); // New state to track data fetching

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? "https://francois0203-website-backend.onrender.com/health"
            : "http://localhost:3000/health"
        );

        if (!response.ok) {
          throw new Error("Backend not available");
        }

        setIsBackendReady(true);
      } catch (error) {
        console.error("Error checking backend status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkBackendStatus();
  }, []);

  // Function to track data fetching state
  const startFetchingData = () => setIsFetchingData(true);
  const stopFetchingData = () => setIsFetchingData(false);

  return {
    loading, 
    isBackendReady, 
    isFetchingData, 
    startFetchingData,
    stopFetchingData
  };
};

export default useBackend;