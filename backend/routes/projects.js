const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define your GitHub username here
const GITHUB_USERNAME = 'Francois0203'; // Replace with your GitHub username

// Route to fetch repositories and README files
router.get('/repos', async (req, res) => {
  try {
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?visibility=all&per_page=100`;

    // Fetch repositories from GitHub
    const reposResponse = await axios.get(reposUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const repos = reposResponse.data;

    // Fetch README content for each repository
    const reposWithReadmes = await Promise.all(
      repos.map(async (repo) => {
        const readmeUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;

        try {
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3.raw',
            },
          });
          const readmeContent = readmeResponse.data;

          // Return the repository data with the README content
          return { ...repo, readme: readmeContent };
        } catch (error) {
          console.error(`Error fetching README for ${repo.name}:`, error.message);
          return { ...repo, readme: null }; // If no README, set to null
        }
      })
    );

    res.status(200).json(reposWithReadmes); // Send repositories with their README content
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;  // Export the router to be used in index.js