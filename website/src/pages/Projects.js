// pages/Projects.js
import React, { useEffect, useState } from "react";
import ScrollBar from "../components/ScrollBar";
import useBackend from "../utils/useBackend";
import LoadingScreen from "../components/LoadingScreen";
import styles from "./Projects.module.css";
import "../theme.css";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://francois0203-website-backend.onrender.com/api/repos"
    : "http://localhost:3000/api/repos";

const Projects = ({ requiresBackend = true }) => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null);
  const { isBackendLoading, isBackendReady, isFetchingData, startFetchingData, stopFetchingData } = useBackend();

  useEffect(() => {
    const fetchRepositories = async () => {
      if (requiresBackend && !isBackendReady) return;
      startFetchingData();

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repositories:", err.message);
        setError(err.message);
      } finally {
        stopFetchingData();
      }
    };

    fetchRepositories();
  }, [isBackendReady, requiresBackend, startFetchingData, stopFetchingData]); // ✅ No more warning!

  const shouldShowLoading =
    (requiresBackend && isBackendLoading) || isFetchingData;

  if (shouldShowLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <ScrollBar>
      <div className={styles.projectGrid}>
        {repos.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          repos.map((repo) => (
            <div key={repo.id} className={styles.projectCard}>
              <div className={styles.projectInfo}>
                <h2 className={styles.projectTitle}>{repo.name}</h2>
                <p className={styles.projectDescription}>
                  {repo.description || "No description provided."}
                </p>

                {repo.languages && (
                  <div className={styles.languages}>
                    <h4>Languages:</h4>
                    {Object.keys(repo.languages).map((language, index) => (
                      <span key={index} className={styles.languageBadge}>
                        {language}
                      </span>
                    ))}
                  </div>
                )}

                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="link">
                  View Repository
                </a>

                <button className="button" onClick={() => setExpandedRepo(expandedRepo === repo.id ? null : repo.id)}>
                  {expandedRepo === repo.id ? "Hide" : "Show More"}
                </button>

                {expandedRepo === repo.id && repo.readme && (
                  <div
                    className={styles.readmeContent}
                    dangerouslySetInnerHTML={{ __html: repo.readme }}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollBar>
  );
};

export default Projects;