import React, { useState } from "react";
import styles from "./SettingsWheel.module.css";
import theme from "../theme.css";

const SettingsWheel = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [colors, setColors] = useState({
    bgPrimary: 18,
    secondaryMain: "#40d8d1",
  });

  const getGrayscaleRGB = (value) => {
    return `rgb(${value}, ${value}, ${value})`;
  };

  const handleBackgroundChange = (e) => {
    const grayscaleValue = parseInt(e.target.value, 10);
    const grayscaleRgb = getGrayscaleRGB(grayscaleValue);
    setColors((prev) => ({ ...prev, bgPrimary: grayscaleValue }));

    document.documentElement.style.setProperty("--bg-primary", grayscaleRgb);

    if (grayscaleValue < 128) {
      document.documentElement.style.setProperty(
        "--bg-secondary",
        adjustColorBrightness(grayscaleRgb, 70)
      );
      document.documentElement.style.setProperty(
        "--bg-tertiary",
        adjustColorBrightness(grayscaleRgb, -40)
      );
    } else {
      document.documentElement.style.setProperty(
        "--bg-secondary",
        adjustColorBrightness(grayscaleRgb, -70)
      );
      document.documentElement.style.setProperty(
        "--bg-tertiary",
        adjustColorBrightness(grayscaleRgb, 40)
      );
    }

    const textColor = grayscaleValue < 128 ? "#e0e0e0" : "#121212";
    document.documentElement.style.setProperty("--text-primary", textColor);
  };

  const handleSecondaryChange = (e) => {
    const newColor = e.target.value;
    setColors((prev) => ({ ...prev, secondaryMain: newColor }));
  
    document.documentElement.style.setProperty("--secondary-main", newColor);
    document.documentElement.style.setProperty("--secondary-light", adjustColorBrightness(newColor, 40));
    document.documentElement.style.setProperty("--secondary-dark", adjustColorBrightness(newColor, -40));
    document.documentElement.style.setProperty("--vibrant-accent", newColor);
    document.documentElement.style.setProperty("--vibrant-glow", hexToRgba(newColor, 0.5));
    document.documentElement.style.setProperty("--hover-effect", adjustColorBrightness(newColor, -20));
    document.documentElement.style.setProperty("--text-secondary", newColor);
  };  

  const resetTheme = () => {
    setColors({ bgPrimary: 18, secondaryMain: "#40d8d1" });

    document.documentElement.style.setProperty("--bg-primary", "#121212");
    document.documentElement.style.setProperty("--bg-secondary", "#444444");
    document.documentElement.style.setProperty("--bg-tertiary", "#2d2d2d");
    document.documentElement.style.setProperty("--secondary-main", "#40d8d1");
    document.documentElement.style.setProperty("--secondary-light", "#80e8e1");
    document.documentElement.style.setProperty("--secondary-dark", "#00c8c1");
    document.documentElement.style.setProperty("--vibrant-accent", "#40d8d1");
    document.documentElement.style.setProperty(
      "--vibrant-glow",
      hexToRgba("#40d8d1", 0.5)
    );
    document.documentElement.style.setProperty("--hover-effect", "#00c8c1");
    document.documentElement.style.setProperty("--text-primary", "#e0e0e0");
    document.documentElement.style.setProperty("--text-secondary", "#40d8d1");
  };

  const adjustColorBrightness = (rgb, amount) => {
    const rgbValues = rgb.match(/\d+/g).map(Number);
    const r = Math.min(255, Math.max(0, rgbValues[0] + amount));
    const g = Math.min(255, Math.max(0, rgbValues[1] + amount));
    const b = Math.min(255, Math.max(0, rgbValues[2] + amount));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgba = (hex, alpha) => {
    const color = parseInt(hex.slice(1), 16);
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      className={styles.settings}
      onMouseEnter={() => setSettingsOpen(true)}
      onMouseLeave={() => setSettingsOpen(false)}
    >
      <div className={styles.wheel}>⚙️</div>
      <div className={`${styles.dropdown} ${!settingsOpen ? styles.hidden : ""}`}>
        <h3 className={theme.h1}>Theme Customisation</h3>

        <div className={styles.dropdownItem}>
          <label htmlFor="bgPrimary" className={theme.h2}>
            Background Colour
          </label>
          <input
            type="range"
            id="bgPrimary"
            min="0"
            max="255"
            value={colors.bgPrimary}
            onChange={handleBackgroundChange}
            className={styles.slider}
          />
        </div>

        <div className={styles.dropdownItem}>
          <label htmlFor="secondaryMain" className={theme.h2}>
            Secondary Colour
          </label>
          <input
            type="color"
            id="secondaryMain"
            value={colors.secondaryMain}
            onChange={handleSecondaryChange}
            className={styles.colorPicker}
          />
        </div>

        <button className={theme.button} onClick={resetTheme}>
          Reset Theme
        </button>
      </div>
    </div>
  );
};

export default SettingsWheel;