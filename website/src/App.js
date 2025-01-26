import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import LoadingScreen from "./components/LoadingScreen";
import useBackend from "./utils/useBackend"; 
import './App.css'; // Import global styles for responsiveness

const App = () => {
  const { isBackendReady, loading } = useBackend(); // Destructure backend status and loading state

  const renderPageWithBackendCheck = (PageComponent) => {
    if (loading) {
      return <LoadingScreen />;
    }
    return isBackendReady ? <PageComponent /> : <p>Backend is not ready. Please try again later.</p>;
  };

  // Redirect to the home page if on reload
  const useRedirectToHomeOnReload = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }, [navigate]);
  };

  const RedirectHandler = () => {
    useRedirectToHomeOnReload();
    return null;
  };

  return (
    <Router basename="/Francois0203">
      <NavBar />
      <div className="container"> {/* This div ensures all pages are wrapped in a responsive container */}
        <Routes>
          <Route path="/" element={renderPageWithBackendCheck(Home)} />
          <Route path="/about" element={renderPageWithBackendCheck(About)} />
          <Route path="/projects" element={renderPageWithBackendCheck(Projects)} />
          {/* Add RedirectHandler to ensure home page redirection */}
          <Route path="*" element={<RedirectHandler />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;