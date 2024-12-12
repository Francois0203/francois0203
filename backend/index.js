require('dotenv').config();
const express = require('express');
const projectsRouter = require('./routes/projects'); // Import the projects router

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the projects router for handling repository and README requests
app.use('/api', projectsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});