const express = require("express");
const { stats } = require("../middleware/statsTracker");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(stats);
});

module.exports = router;