import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import LoadingIcon from './components/LoadingIcon'; // Import the LoadingIcon component
import { useLoading } from './context/LoadingContext'; // Import the useLoading hook

const App = () => {
  const { isLoading } = useLoading(); // Get the loading state from context

  return (
    <Router basename="/Francois0203">
      <NavBar />
      {/* Show the LoadingIcon only when isLoading is true */}
      {isLoading && <LoadingIcon />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

export default App;