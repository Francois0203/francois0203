import React, { useEffect, useState } from "react";
import { marked } from "marked"; // Import marked for Markdown parsing
import styles from "./Projects.module.css";
import ScrollBar from "../components/ScrollBar";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/repos";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null); // Track which repo is expanded

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Repositories:", data);
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repositories:", err.message);
        setError(err.message);
      }
    };

    fetchRepositories();
  }, []);

  const toggleReadme = (repoId) => {
    setExpandedRepo(expandedRepo === repoId ? null : repoId);
  };

  const renderTableOfContents = (readmeContent) => {
    const toc = [];
    const regex = /##\s+(.*)/g;
    let match;
    while ((match = regex.exec(readmeContent)) !== null) {
      toc.push(match[1]);
    }
    return toc;
  };

  const handleTocClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatLanguages = (languages) => {
    return Object.keys(languages).map((lang) => (
      <span key={lang} className={styles.languageBadge}>
        {lang}
      </span>
    ));
  };

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
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
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View Repository
                </a>
                <div className={styles.languages}>
                  <h4>Languages:</h4>
                  {repo.languages && Object.keys(repo.languages).length > 0 ? (
                    <div className={styles.languagesList}>
                      {formatLanguages(repo.languages)}
                    </div>
                  ) : (
                    <span>No languages specified</span>
                  )}
                </div>
                <button
                  className={styles.readmeToggle}
                  onClick={() => toggleReadme(repo.id)}
                >
                  {expandedRepo === repo.id ? "Hide README" : "Show README"}
                </button>
                {expandedRepo === repo.id && repo.readme && (
                  <div className={styles.readmeContent}>
                    {/* Table of Contents */}
                    <div className={styles.tableOfContents}>
                      <h4>Table of Contents</h4>
                      {renderTableOfContents(repo.readme).map((section, index) => (
                        <button
                          key={index}
                          onClick={() => handleTocClick(section)}
                          className={styles.tocLink}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                    {/* Render Markdown using marked */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked(repo.readme),
                      }}
                      className={styles.markdown}
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