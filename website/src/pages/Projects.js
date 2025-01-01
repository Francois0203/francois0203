import React, { useEffect, useState } from "react";
import { marked } from "marked";
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";
import useBackend from "../utils/useBackend"; // Import the backend check hook
import LoadingScreen from "../components/LoadingScreen"; // Import the LoadingScreen component

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://francois0203-website-backend.onrender.com/api/repos"
    : "http://localhost:3000/api/repos";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null);
  const { loading, isBackendReady } = useBackend(); // Get backend status and loading state

  // Function to toggle the expanded README for a repository
  const toggleReadme = (repoId) => {
    setExpandedRepo(expandedRepo === repoId ? null : repoId);
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!isBackendReady) return; // Prevent fetching if backend is not ready

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repositories:", err.message);
        setError(err.message);
      }
    };

    fetchRepositories();
  }, [isBackendReady]); // Fetch repositories when backend is ready

  if (loading) {
    return <LoadingScreen />; // Show the custom loading screen while backend is loading
  }

  if (!isBackendReady) {
    return <p>Backend is not ready. Please try again later.</p>; // Show this message if backend is not ready
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>; // Handle any error while fetching data
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <ScrollBar>
        <div className={styles.projectGrid}>
          {repos.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className={styles.projectCard}>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description provided."}</p>

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

                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View Repository
                </a>

                <button
                  className={styles.readmeToggle}
                  onClick={() => toggleReadme(repo.id)}
                >
                  {expandedRepo === repo.id ? "Hide README" : "Show README"}
                </button>

                {expandedRepo === repo.id && repo.readme && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(repo.readme),
                    }}
                    className={styles.markdown}
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