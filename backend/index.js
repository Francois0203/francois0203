require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects'); // Import the projects router

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors({
  origin: ['http://localhost:5000', 'https://francois0203.github.io/Francois0203'], // Adjust as needed
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middleware to parse JSON
app.use(express.json());

// Use the projects router for handling repository and README requests
app.use('/api', projectsRouter);

// Default route for health checks or root access
app.get('/', (req, res) => {
  res.send('Welcome to the backend! API is live at /api');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});