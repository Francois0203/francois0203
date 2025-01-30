const express = require("express");
const axios = require("axios");
const router = express.Router();

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_USERNAME = "Francois0203";

// Helper to fetch from GitHub API
const fetchFromGitHub = async (url, token, accept = "application/vnd.github.v3+json") => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: accept,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${url}: ${error.message}`);
    return null; // Return null to handle missing data gracefully
  }
};

// Helper to fetch the README for a repository
const fetchReadme = async (repoFullName, token) => {
  const readmeUrl = `${GITHUB_API_BASE_URL}/repos/${repoFullName}/readme`;
  const readme = await fetchFromGitHub(readmeUrl, token, "application/vnd.github.VERSION.raw");
  return readme;
};

// Helper to fetch languages for a specific repository
const fetchLanguages = async (repoFullName, token) => {
  const languagesUrl = `${GITHUB_API_BASE_URL}/repos/${repoFullName}/languages`;
  const languages = await fetchFromGitHub(languagesUrl, token);
  return languages;
};

// Fetch personal repositories including README and languages
const fetchPersonalRepositories = async (token) => {
  const reposUrl = `${GITHUB_API_BASE_URL}/user/repos?visibility=all&per_page=100`;
  const repos = await fetchFromGitHub(reposUrl, token);
  return repos
    ? await Promise.all(repos.filter((repo) => repo.owner.login === GITHUB_USERNAME).map(async (repo) => {
        const readme = await fetchReadme(repo.full_name, token); // Fetch the README content
        const languages = await fetchLanguages(repo.full_name, token); // Fetch the languages
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          readme: readme || "", // Store the README content
          languages: languages || {}, // Store the languages
          private: repo.private,
        };
      }))
    : [];
};

// Fetch organizations the user is part of
const fetchOrganizations = async (token) => {
  const orgsUrl = `${GITHUB_API_BASE_URL}/user/orgs`;
  const orgs = await fetchFromGitHub(orgsUrl, token);
  return orgs ? orgs.map((org) => ({
    id: org.id,
    name: org.login,
  })) : [];
};

// Fetch repositories for a specific organization including README and languages
const fetchOrganizationRepositories = async (orgName, token) => {
  const reposUrl = `${GITHUB_API_BASE_URL}/orgs/${orgName}/repos?per_page=100`;
  const repos = await fetchFromGitHub(reposUrl, token);
  return repos
    ? await Promise.all(repos.map(async (repo) => {
        const readme = await fetchReadme(repo.full_name, token); // Fetch the README content
        const languages = await fetchLanguages(repo.full_name, token); // Fetch the languages
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          readme: readme || "", // Store the README content
          languages: languages || {}, // Store the languages
          private: repo.private,
        };
      }))
    : [];
};

// Route to fetch personal projects and organization repositories
router.get("/", async (req, res) => {
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

  try {
    // Fetch personal repositories
    const personalProjects = await fetchPersonalRepositories(githubToken);

    // Fetch organizations
    const organizations = await fetchOrganizations(githubToken);

    // Fetch repositories for each organization
    const orgsWithRepos = await Promise.all(
      organizations.map(async (org) => ({
        ...org,
        repositories: await fetchOrganizationRepositories(org.name, githubToken),
      }))
    );

    res.status(200).json({ personalProjects, organizations: orgsWithRepos });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;