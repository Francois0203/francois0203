import React, { useEffect, useState } from "react";
import ScrollBar from "../components/ScrollBar";
import useBackend from "../utils/useBackend";
import LoadingScreen from "../components/LoadingScreen";
import styles from "./Projects.module.css";
import "../theme.css";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://francois0203-website-backend.onrender.com/projects"
    : "http://localhost:3000/projects";

const Projects = ({ requiresBackend = true }) => {
  const [personalProjects, setPersonalProjects] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [expandedOrg, setExpandedOrg] = useState(null);
  const [expandedRepo, setExpandedRepo] = useState(null); // This will store the ID of the repo that's expanded
  const [expandedPersonal, setExpandedPersonal] = useState(false);
  const [expandedOrganizations, setExpandedOrganizations] = useState(false);
  const { isBackendLoading, isBackendReady, isFetchingData, startFetchingData, stopFetchingData } = useBackend();

  useEffect(() => {
    const fetchProjects = async () => {
      if (requiresBackend && !isBackendReady) return;
      startFetchingData();

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        setPersonalProjects(data.personalProjects || []);
        setOrganizations(data.organizations || []);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
      } finally {
        stopFetchingData();
      }
    };

    fetchProjects();
  }, [isBackendReady, requiresBackend, startFetchingData, stopFetchingData]);

  const shouldShowLoading =
    (requiresBackend && isBackendLoading) || isFetchingData;

  if (shouldShowLoading) return <LoadingScreen />;

  const toggleTab = (tab) => {
    if (tab === "personal") {
      setActiveTab("personal");
      setExpandedPersonal(!expandedPersonal);
      setExpandedOrganizations(false);  // Close organizations tab when personal tab opens
    } else {
      setActiveTab("organizations");
      setExpandedOrganizations(!expandedOrganizations);
      setExpandedPersonal(false);  // Close personal tab when organizations tab opens
    }
  };

  const toggleReadme = (repoId) => {
    // Toggle the readme visibility based on the repository ID
    setExpandedRepo(expandedRepo === repoId ? null : repoId);
  };

  return (
    <ScrollBar>
      {/* Main Container */}
      <div className={styles.mainContainer}>
        {/* Personal Projects Tab */}
        <div>
          <h2
            className={`${styles.tabTitle} ${expandedPersonal ? styles.expanded : ''} ${styles.clickable}`}
            onClick={() => toggleTab("personal")}
          >
            Personal Projects {expandedPersonal ? "▲" : "▼"}
          </h2>

          {expandedPersonal && activeTab === "personal" && (
            <div className={styles.projectGrid}>
              {personalProjects.length === 0 ? (
                <p>No personal repositories found.</p>
              ) : (
                personalProjects.map((repo) => (
                  <div key={repo.id} className={styles.projectCard}>
                    <div className={styles.projectInfo}>
                      <h2 className={styles.projectTitle}>{repo.name}</h2>
                      <p className={styles.projectDescription}>
                        {repo.description || "No description provided."}
                      </p>

                      {/* Display Language Badges */}
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

                      {/* Show More Button */}
                      <button className="button" onClick={() => toggleReadme(repo.id)}>
                        {expandedRepo === repo.id ? "Hide" : "Show More"}
                      </button>

                      {/* Expanded README Content */}
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
          )}
        </div>

        {/* Organizations Tab */}
        <div>
          <h2
            className={`${styles.tabTitle} ${expandedOrganizations ? styles.expanded : ''} ${styles.clickable}`}
            onClick={() => toggleTab("organizations")}
          >
            Organizations {expandedOrganizations ? "▲" : "▼"}
          </h2>

          {expandedOrganizations && activeTab === "organizations" && (
            <div className={styles.projectGrid}>
              {organizations.length === 0 ? (
                <p>No organizations found.</p>
              ) : (
                organizations.map((org) => (
                  <div key={org.id}>
                    <h3
                      className={`${styles.tabTitle} ${expandedOrg === org.id ? styles.expanded : ''} ${styles.clickable}`}
                      onClick={() => setExpandedOrg(expandedOrg === org.id ? null : org.id)}
                    >
                      {org.name} {expandedOrg === org.id ? "▲" : "▼"}
                    </h3>

                    {/* Show Repositories for Expanded Organization */}
                    {expandedOrg === org.id && (
                      <div className={styles.projectGrid}>
                        {org.repositories.length === 0 ? (
                          <p>No repositories in this organization.</p>
                        ) : (
                          org.repositories.map((repo) => (
                            <div key={repo.id} className={styles.projectCard}>
                              <h3 className={styles.projectTitle}>{repo.name}</h3>
                              <p className={styles.projectDescription}>
                                {repo.description || "No description provided."}
                              </p>

                              {/* Display Language Badges for Organization Repos */}
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

                              {/* Show More Button for Organization Repos */}
                              <button className="button" onClick={() => toggleReadme(repo.id)}>
                                {expandedRepo === repo.id ? "Hide" : "Show More"}
                              </button>

                              {/* Expanded README Content for Organization Repos */}
                              {expandedRepo === repo.id && repo.readme && (
                                <div
                                  className={styles.readmeContent}
                                  dangerouslySetInnerHTML={{ __html: repo.readme }}
                                />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollBar>
  );
};

export default Projects;