import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create context for loading state
export const LoadingContext = createContext({
  isLoading: false, // General loading state for specific pages
  setIsLoading: () => {},
  backendReady: false, // Whether the backend is ready
  setBackendReady: () => {},
  triggerLoading: () => {}, // Function to trigger the loading state
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // General loading state
  const [backendReady, setBackendReady] = useState(false); // Backend readiness state

  // Helper function to manage loading state
  const triggerLoading = (state) => {
    setIsLoading(state);
  };

  // Effect to check backend status when the app loads
  useEffect(() => {
    const pingBackend = async () => {
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://francois0203-website-backend.onrender.com/health"
          : "http://localhost:3000/health";

      setIsLoading(true); // Show loading indicator when checking backend
      try {
        const response = await axios.get(backendUrl);
        if (response.status === 200) {
          setBackendReady(true); // Backend is ready
        }
      } catch (error) {
        console.error("Failed to connect to the backend:", error);
      } finally {
        setIsLoading(false); // Hide loading indicator after backend check
      }
    };

    pingBackend();
  }, []); // Run this effect once when the app is loaded

  return (
    <LoadingContext.Provider
      value={{
        isLoading, // Can be used for page-level loading
        setIsLoading, // To manually set loading state from other components
        backendReady, // Backend readiness status
        setBackendReady, // To manually set backend readiness (if needed)
        triggerLoading, // Function to manage loading state
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to access loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};