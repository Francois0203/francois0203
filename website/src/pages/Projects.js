import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";
import { marked } from "marked"; // Import the marked library to parse Markdown

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/repos";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      console.log("Attempting to fetch repositories from:", API_URL); // Debugging: Check API URL
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Repositories:", data); // Debugging: Log the fetched data
        setRepos(data); // Set repositories to state
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError(`Error fetching repositories: ${error.message}`);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Projects</h1>
      {error && <p className={styles.error}>{error}</p>} {/* Display error if present */}
      <ScrollBar>
        <div className={styles.projectGrid}>
          {repos.length === 0 ? (
            <p>No repositories found or an error occurred.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className={styles.projectCard}>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description provided."}</p>

                {/* Ensure that repo.languages is an array */}
                <p className={styles.language}>
                  Languages:{" "}
                  {repo.languages && repo.languages.length > 0
                    ? repo.languages.join(", ")
                    : "No languages specified"}
                </p>

                {repo.readme && (
                  <div className={styles.readmeContent}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked(repo.readme), // Render Markdown as HTML
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