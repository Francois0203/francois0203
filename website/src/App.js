import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import LoadingIcon from "./components/LoadingIcon"; // Loading icon
import { useLoading } from "./context/LoadingContext";

const App = () => {
  const { isLoading } = useLoading();

  return (
    <Router basename="/Francois0203">
      <NavBar />
      {isLoading && <LoadingIcon />} {/* Display the loading icon if active */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

export default App;