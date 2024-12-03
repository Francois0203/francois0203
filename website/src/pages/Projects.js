import React from "react";
import styles from "./Projects.module.css";

const Projects = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Projects</h1>
      <div className={styles.projectGrid}>
        <div className={styles.projectCard}>
          <h2>Project 1</h2>
          <p>Details about the first project.</p>
        </div>
        <div className={styles.projectCard}>
          <h2>Project 2</h2>
          <p>Details about the second project.</p>
        </div>
        <div className={styles.projectCard}>
          <h2>Project 3</h2>
          <p>Details about the third project.</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;