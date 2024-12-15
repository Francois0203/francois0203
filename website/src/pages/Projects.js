import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";
import { marked } from "marked"; // Correct import for marked

const API_URL = "https://francois0203-website-backend.onrender.com/api/repos"; // Backend endpoint
//const API_URL = "http://localhost:3000/api/repos"; // Local backend endpoint

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

        // Debugging: Log the fetched repositories to check the data
        console.log("Fetched Repositories:", data);

        // Parse README content as markdown and convert to HTML
        const reposWithFormattedReadmes = data.map((repo) => ({
          ...repo,
          readme: repo.readme ? marked(repo.readme) : null, // Convert markdown to HTML
        }));

        setRepos(reposWithFormattedReadmes); // Set repositories with their parsed README content
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  const handleReadmeToggle = (index) => {
    setRepos((prevRepos) =>
      prevRepos.map((repo, idx) =>
        idx === index ? { ...repo, showReadme: !repo.showReadme } : repo
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Projects</h1>
      <ScrollBar>
        <div className={styles.projectGrid}>
          {repos.length === 0 ? (
            <p>No repositories found or an error occurred.</p>
          ) : (
            repos.map((repo, index) => (
              <div key={repo.id} className={styles.projectCard}>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description provided."}</p>
                <p className={styles.language}>
                  Language: {repo.language || "Not specified"}
                </p>

                <button
                  className={styles.readmeButton}
                  onClick={() => handleReadmeToggle(index)}
                >
                  {repo.showReadme ? "Hide README" : "Show README"}
                </button>

                {repo.showReadme && repo.readme && (
                  <div
                    className={styles.readmeContent}
                    dangerouslySetInnerHTML={{
                      __html: repo.readme, // Render the parsed README content
                    }}
                  />
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