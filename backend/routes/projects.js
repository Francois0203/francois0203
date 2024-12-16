const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_USERNAME = 'Francois0203'; // Your GitHub username

// Route to fetch repositories, README, and languages
router.get('/repos', async (req, res) => {
  try {
    const reposUrl = `https://api.github.com/user/repos?visibility=all&per_page=100`;
    
    // Fetch all repositories for the user
    const reposResponse = await axios.get(reposUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const repos = reposResponse.data;

    console.log(`Fetched ${repos.length} repositories for user: ${GITHUB_USERNAME}`);

    // Fetch README and languages for each repository
    const reposWithDetails = await Promise.all(
      repos.map(async (repo) => {
        const readmeUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;
        const languagesUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;

        let readme = null;
        let languages = null;

        try {
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3.raw',
            },
          });
          readme = readmeResponse.data;
        } catch (error) {
          console.error(`README not found for ${repo.name}: ${error.message}`);
        }

        try {
          const languagesResponse = await axios.get(languagesUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          });
          languages = languagesResponse.data;
        } catch (error) {
          console.error(`Languages not found for ${repo.name}: ${error.message}`);
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

    console.log("Fetched details for all repositories.");
    res.status(200).json(reposWithDetails);
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;