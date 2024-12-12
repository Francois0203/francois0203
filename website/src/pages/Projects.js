import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";

const API_URL = "https://francois0203-website-backend.onrender.com/api/repos"; // Backend endpoint

const Projects = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch repositories and README content from the backend
        const response = await fetch(API_URL);
        if (!response.ok) {
          console.error("Error fetching repositories:", response.statusText);
          return;
        }

        const data = await response.json();
        setRepos(data); // Set repositories with their README content
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Projects</h1>
      <ScrollBar>
        <div className={styles.projectGrid}>
          {repos.length === 0 ? (
            <p>No repositories found or an error occurred.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className={styles.projectCard}>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description provided."}</p>
                <p className={styles.language}>
                  Language: {repo.language || "Not specified"}
                </p>
                {repo.readme && (
                  <div className={styles.readmeContent}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: repo.readme, // Render the README content as HTML
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollBar>
    </div>
  );
};

export default Projects;