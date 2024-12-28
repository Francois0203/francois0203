import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const LoadingContext = createContext({
  backendReady: false,
  setBackendReady: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [backendReady, setBackendReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const pingBackend = async () => {
      const backendUrl = process.env.NODE_ENV === "production"
        ? "https://francois0203-website-backend.onrender.com/health"
        : "http://localhost:3000/health";

      try {
        // Ping the backend (non-blocking)
        const response = await axios.get(backendUrl);
        if (response.status === 200) {
          console.log("Backend is live:", response.data);
          setBackendReady(true);
        }
      } catch (error) {
        console.error("Failed to connect to the backend:", error);
      }
    };

    // Call the backend in the background
    pingBackend();
  }, []);

  return (
    <LoadingContext.Provider value={{ backendReady, setBackendReady, isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};