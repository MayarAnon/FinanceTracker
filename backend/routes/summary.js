const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, async (req, res) => {
  // Berechnen Sie die Gesamteinnahmen und -ausgaben
  // Dies kann mit SQL-Abfragen erfolgen
});

module.exports = router;
