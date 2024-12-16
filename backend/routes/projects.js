const express = require("express");
const axios = require("axios");
const router = express.Router();

// Dynamic GitHub API URL
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
    throw error;
  }
};

// Route to fetch repositories
router.get("/repos", async (req, res) => {
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN; // Use your token
  const reposUrl = `${GITHUB_API_BASE_URL}/user/repos?visibility=all&per_page=100`;

  try {
    // Fetch repositories from GitHub
    const repos = await fetchFromGitHub(reposUrl, githubToken);

    // Prepare repository details with README and languages
    const reposWithDetails = await Promise.all(
      repos.slice(0, 5).map(async (repo) => {
        const readmeUrl = `${GITHUB_API_BASE_URL}/repos/${repo.owner.login}/${repo.name}/readme`;
        const languagesUrl = `${GITHUB_API_BASE_URL}/repos/${repo.owner.login}/${repo.name}/languages`;

        let readme = null;
        let languages = null;

        try {
          readme = await fetchFromGitHub(readmeUrl, githubToken, "application/vnd.github.v3.raw");
        } catch {
          console.warn(`README not found for ${repo.name}`);
        }

        try {
          languages = await fetchFromGitHub(languagesUrl, githubToken);
        } catch {
          console.warn(`Languages not found for ${repo.name}`);
        }

        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          private: repo.private,
          readme,
          languages,
        };
      })
    );

    res.status(200).json(reposWithDetails);
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;