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

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null);
  const { loading, isBackendReady } = useBackend();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const toggleReadme = (repoId) => {
    setExpandedRepo(expandedRepo === repoId ? null : repoId);
  };

  const formatReadmeContent = (content) => {
    content = content.replace(/## Table of Contents[\s\S]*?##/g, "");
    content = content.replace(/(#{1,6})\s*(.*?)(\n|$)/g, (match, hashes, title) => {
      const level = hashes.length;
      return `<h${level}>${title.trim()}</h${level}>`;
    });
    content = content.replace(/^\s*[-*+]\s+(.*?)(\n|$)/gm, (match, listItem) => {
      return `<p>${listItem.trim()}</p>`;
    });
    content = content.replace(/(?:^|\n)([^\n]+)(?=\n|$)/g, (match, paragraph) => {
      return `<p>${paragraph.trim()}</p>`;
    });
    content = content.replace(/\*\*(.*?)\*\*/g, "$1");
    content = content.replace(/\*(.*?)\*/g, "$1");
    return content;
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!isBackendReady) return;
      setIsFetchingData(true);

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
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchRepositories();
  }, [isBackendReady]);

  if (loading || isFetchingData) {
    return <LoadingScreen />;
  }

  if (!isBackendReady) {
    return <p className="error">Backend is not ready. Please try again later.</p>;
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

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    View Repository
                  </a>

                  <button className="button" onClick={() => toggleReadme(repo.id)}>
                    {expandedRepo === repo.id ? "Hide" : "Show More"}
                  </button>

                  {expandedRepo === repo.id && repo.readme && (
                    <div
                      className={styles.readmeContent}
                      dangerouslySetInnerHTML={{
                        __html: formatReadmeContent(repo.readme),
                      }}
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