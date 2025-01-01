import { useState, useEffect } from 'react';

// Custom hook to check if backend is ready
const useBackend = () => {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('https://francois0203-website-backend.onrender.com/'); // Adjust the backend URL
        if (response.ok) {
          setIsBackendReady(true);
        } else {
          setIsBackendReady(false);
        }
      } catch (error) {
        setIsBackendReady(false);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return { isBackendReady, loading };
};

export default useBackend;