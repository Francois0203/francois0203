require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Route to fetch README files for a given repository
app.get('/api/readme/:owner/:repo', async (req, res) => {
    const { owner, repo } = req.params;

    try {
        // GitHub API URL for the README file
        const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

        // Fetch README file content from GitHub
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3.raw',
            },
        });

        res.status(200).send(response.data); // Send raw README content
    } catch (error) {
        console.error('Error fetching README:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});