// hooks/useBackend.js
import { useState, useEffect, useCallback } from "react";

const useBackend = () => {
  const [isBackendLoading, setIsBackendLoading] = useState(true);
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? "https://francois0203-website-backend.onrender.com/health"
            : "http://localhost:3000/health"
        );

        if (!response.ok) throw new Error("Backend not available");

        setIsBackendReady(true);
      } catch (error) {
        console.error("Error checking backend status:", error);
      } finally {
        setIsBackendLoading(false);
      }
    };

    checkBackendStatus();
  }, []);

  // Memoize the functions so they don’t get re-created on each render
  const startFetchingData = useCallback(() => setIsFetchingData(true), []);
  const stopFetchingData = useCallback(() => setIsFetchingData(false), []);

  return {
    isBackendLoading,
    isBackendReady,
    isFetchingData,
    startFetchingData,
    stopFetchingData,
  };
};

export default useBackend;