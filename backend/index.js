require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects'); // Import the projects router

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors({
  origin: ['http://localhost:5000', 'https://Francois0203.github.io/Francois0203/'], // Allow requests from your local frontend and deployed frontend
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middleware to parse JSON
app.use(express.json());

// Use the projects router for handling repository and README requests
//app.use('/api', projectsRouter);
app.use('/', projectsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});