import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";
import { marked } from "marked"; // Use marked to convert markdown to HTML

// Dynamically set API URL based on environment
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/repos";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Repositories:", data);

        // Convert markdown to HTML before setting state
        const reposWithHTMLReadme = data.map((repo) => ({
          ...repo,
          readme: repo.readme ? marked(repo.readme) : null,
        }));

        setRepos(reposWithHTMLReadme);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError(error.message);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Projects</h1>
      <ScrollBar>
        <div className={styles.projectGrid}>
          {error ? (
            <p>Error: {error}</p>
          ) : repos.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className={styles.projectCard}>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description provided."}</p>
                <p className={styles.language}>
                  Language: {repo.language || "Not specified"}
                </p>
                {repo.readme && (
                  <div
                    className={styles.readmeContent}
                    dangerouslySetInnerHTML={{ __html: repo.readme }}
                  ></div>
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
