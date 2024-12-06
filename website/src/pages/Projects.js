import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import { marked } from "marked";
import ScrollBar from "../components/ScrollBar";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [readmeContent, setReadmeContent] = useState({});

  // Use environment variable to get GitHub token
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  
  if (!GITHUB_TOKEN) {
    console.error("GitHub token is not defined. Make sure the environment variable is set.");
  }

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/user/repos?visibility=all&per_page=100",
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Error fetching repositories:", response.statusText);
          return;
        }

        const repos = await response.json();
        setRepos(repos);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    if (GITHUB_TOKEN) {
      fetchRepos();
    }
  }, [GITHUB_TOKEN]);

  const fetchReadme = async (repoFullName) => {
    try {
      if (readmeContent[repoFullName]) {
        setReadmeContent((prev) => ({
          ...prev,
          [repoFullName]: null,
        }));
        return;
      }

      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/contents/README.md`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch README.md. Status: ${response.status}`);
      }

      const readme = await response.json();
      const decodedReadme = atob(readme.content); // Decode Base64 content
      const htmlContent = marked(decodedReadme); // Convert Markdown to HTML

      setReadmeContent((prev) => ({
        ...prev,
        [repoFullName]: htmlContent,
      }));
    } catch (error) {
      console.error("Error fetching README.md:", error.message);
    }
  };

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
                <button
                  className={styles.readmeButton}
                  onClick={() => fetchReadme(repo.full_name)}
                >
                  {readmeContent[repo.full_name] ? "Hide README" : "Show README"}
                </button>
                {readmeContent[repo.full_name] && (
                  <div className={styles.readmeContent}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: readmeContent[repo.full_name],
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