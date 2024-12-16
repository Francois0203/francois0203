require("dotenv").config();
const express = require("express");
const cors = require("cors");
const projectsRouter = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5000", // Local frontend
//       "https://francois0203.github.io/Francois0203", // Deployed frontend
//       "https://francois0203.github.io/Francois0203/projects",
//     ],
//     methods: "GET",
//     allowedHeaders: "Content-Type, Authorization",
//   })
// );

app.use(cors())

app.use(express.json());
app.use("/api", projectsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend! API is live at /api");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});