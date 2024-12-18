import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import LoadingIcon from "./components/LoadingIcon";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <div>
      {isLoading && <LoadingIcon />}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <Router basename="/Francois0203">
        <AppContent />
      </Router>
    </LoadingProvider>
  );
};

export default App;