require("dotenv").config();
const express = require("express");
const cors = require("cors");
const projectsRouter = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow cross-origin requests for local and production environments
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the projects router for the /api path
app.use("/api", projectsRouter);

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is healthy" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the backend! API is live at /api");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});