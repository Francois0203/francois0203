import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState("#3c3c3c");

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSecondaryColor(newColor);
    const root = document.documentElement;
    root.style.setProperty("--secondary-bg", newColor);
  };

  const resetTheme = () => {
    // Reset to default theme colors
    const root = document.documentElement;
    root.style.setProperty("--secondary-bg", "#4a4a4a"); // Default secondary color
    setSecondaryColor("#4a4a4a");
  };

  const handleExtraFunctionality = () => {
    alert("Extra functionality executed!");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MatteGraySite</div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/projects" className={styles.link}>Projects</Link>
      </div>
      <div
        className={styles.settings}
        onMouseEnter={openSettings}
        onMouseLeave={closeSettings}
      >
        <div className={styles.wheel}>⚙️</div>
        <div
          className={`${styles.dropdown} ${!settingsOpen ? styles.hidden : ""}`}
        >
          <div className={styles.dropdownItem}>
            <label htmlFor="colorPicker" className={styles.label}>
              Change Secondary Color
            </label>
            <input
              type="color"
              id="colorPicker"
              value={secondaryColor}
              onChange={handleColorChange}
              className={styles.colorPicker}
            />
          </div>
          <button
            className={`${styles.dropdownItem} ${styles.actionButton}`}
            onClick={resetTheme}
          >
            Reset Theme
          </button>
          <button
            className={`${styles.dropdownItem} ${styles.actionButton}`}
            onClick={handleExtraFunctionality}
          >
            Extra Functionality
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;