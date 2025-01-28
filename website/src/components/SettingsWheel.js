// src/components/SettingsWheel.js
import React, { useState, useEffect, useCallback } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./SettingsWheel.module.css";
import theme from "../theme.css";

const SettingsWheel = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [secondaryColor, setSecondaryColor] = useState(270); // Start with purple (HSL hue 270)
  const [isTransitioning, setIsTransitioning] = useState(false); // Track the theme transition

  const applySecondaryColor = useCallback((color) => {
    document.documentElement.style.setProperty("--secondary-main", color);
    document.documentElement.style.setProperty("--secondary-light", adjustColorBrightness(color, 40));
    document.documentElement.style.setProperty("--secondary-dark", adjustColorBrightness(color, -40));
    document.documentElement.style.setProperty("--vibrant-accent", color);
    document.documentElement.style.setProperty("--vibrant-glow", hexToRgba(color, 0.5));
    document.documentElement.style.setProperty("--hover-effect", adjustColorBrightness(color, -20));
    document.documentElement.style.setProperty("--text-secondary", color);
  }, []);

  useEffect(() => {
    // Initialize the theme as dark mode
    applyDarkMode();
    const initialColor = "hsl(270, 100%, 50%)"; // Purple
    applySecondaryColor(initialColor);
  }, [applySecondaryColor]);

  const applyDarkMode = () => {
    document.documentElement.style.setProperty("--bg-primary", "var(--bg-dark-primary)");
    document.documentElement.style.setProperty("--bg-secondary", "var(--bg-dark-secondary)");
    document.documentElement.style.setProperty("--text-primary", "var(--text-dark-primary)");
  };

  const applyLightMode = () => {
    document.documentElement.style.setProperty("--bg-primary", "var(--bg-light-primary)");
    document.documentElement.style.setProperty("--bg-secondary", "var(--bg-light-secondary)");
    document.documentElement.style.setProperty("--text-primary", "var(--text-light-primary)");
  };

  const toggleTheme = () => {
    // Trigger the expanding circle transition
    setIsTransitioning(true);

    setTimeout(() => {
      setIsDarkMode((prevMode) => {
        const newMode = !prevMode;
        if (newMode) {
          applyDarkMode();
        } else {
          applyLightMode();
        }
        return newMode;
      });

      // End the transition after the animation finishes
      setTimeout(() => setIsTransitioning(false), 1000); // Matches CSS duration
    }, 50); // Slight delay before transition
  };

  const handleSecondarySliderChange = (e) => {
    const sliderValue = e.target.value;
    setSecondaryColor(sliderValue);

    const color = `hsl(${sliderValue}, 100%, 50%)`;
    applySecondaryColor(color);
  };

  const adjustColorBrightness = (hsl, amount) => {
    const [h, s, l] = hsl.match(/\d+/g).map(Number);
    const newL = Math.min(100, Math.max(0, l + amount));
    return `hsl(${h}, ${s}%, ${newL}%)`;
  };

  const hexToRgba = (hsl, alpha) => {
    const [h, s, l] = hsl.match(/\d+/g).map(Number);
    const a = alpha || 1;
    const c = (1 - Math.abs(2 * l / 100 - 1)) * (s / 100);
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l / 100 - c / 2;
    let r = 0, g = 0, b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <div
      className={`${styles.settings} ${isTransitioning ? styles.transitioning : ""}`}
      onMouseEnter={() => setSettingsOpen(true)}
      onMouseLeave={() => setSettingsOpen(false)}
    >
      <div className={styles.wheel}>⚙️</div>
      <div
        className={`${styles.dropdown} ${!settingsOpen ? styles.hidden : ""}`}
        style={{ top: "calc(100% + 8px)", right: 0 }} // Align dropdown below wheel
      >
        <h3 className={theme.h1}>Theme Customisation</h3>

        {/* Dark/Light Mode Toggle */}
        <div className={styles.dropdownItem}>
          <label htmlFor="themeToggle" className={theme.h2}>
            Theme Mode
          </label>
          <div
            id="themeToggle"
            onClick={toggleTheme}
            className={styles.toggleSwitch}
          >
            {isDarkMode ? <FaMoon size={36} /> : <FaSun size={36} />}
          </div>
        </div>

        {/* Secondary Colour Slider */}
        <div className={styles.dropdownItem}>
          <label htmlFor="secondarySlider" className={theme.h2}>
            Secondary Colour
          </label>
          <input
            type="range"
            id="secondarySlider"
            min="0"
            max="360"
            value={secondaryColor}
            onChange={handleSecondarySliderChange}
            className={styles.colorSlider}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsWheel;