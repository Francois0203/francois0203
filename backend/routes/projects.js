const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define your GitHub username here
const GITHUB_USERNAME = 'Francois0203'; // Replace with your GitHub username

// Route to fetch repositories and README files
router.get('/repos', async (req, res) => {
  try {
    const reposUrl = `https://api.github.com/user/repos?visibility=all&per_page=100`;  // Fetch both public and private repositories

    // Fetch repositories from GitHub
    const reposResponse = await axios.get(reposUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`, // Use your GitHub token
      },
    });

    // Debugging: Log repositories fetched
    console.log("Fetched Repositories from GitHub:", reposResponse.data);

    const repos = reposResponse.data;

    // Fetch README content and languages for each repository
    const reposWithDetails = await Promise.all(
      repos.map(async (repo) => {
        const readmeUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;
        const languagesUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;

        try {
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3.raw',
            },
          });
          const readmeContent = readmeResponse.data;

          // Fetch languages for the repository
          const languagesResponse = await axios.get(languagesUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          });
          const languages = languagesResponse.data;

          // Debugging: Log languages for each repo
          console.log(`Languages for ${repo.name}:`, languages);

          // Return the repository data with the README and languages
          return { ...repo, readme: readmeContent, languages: languages };
        } catch (error) {
          console.error(`Error fetching details for ${repo.name}:`, error.message);
          return { ...repo, readme: null, languages: null }; // If no README or languages, set to null
        }
      })
    );

    // Debugging: Log repositories with README and languages
    console.log("Repositories with README and Languages:", reposWithDetails);

    res.status(200).json(reposWithDetails); // Send repositories with their README and languages
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;  // Export the router to be used in index.js