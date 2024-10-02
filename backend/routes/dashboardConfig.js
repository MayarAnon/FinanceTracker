const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { DashboardConfig } = require("../models/associations");

// Dashboard-Konfiguration speichern
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { layout, widgets } = req.body;

    // Validierung der Eingaben
    if (!layout || !widgets) {
      return res
        .status(400)
        .json({ message: "Layout und Widgets sind erforderlich." });
    }

    let config = await DashboardConfig.findOne({ where: { user_id: userId } });

    if (config) {
      // Aktualisieren der bestehenden Konfiguration
      await config.update({
        layout: JSON.stringify(layout),
        widgets: JSON.stringify(widgets),
      });
    } else {
      // Erstellen einer neuen Konfiguration
      await DashboardConfig.create({
        user_id: userId,
        layout: JSON.stringify(layout),
        widgets: JSON.stringify(widgets),
      });
    }

    res.json({ message: "Dashboard-Konfiguration gespeichert." });
  } catch (error) {
    console.error("Fehler beim Speichern der Dashboard-Konfiguration:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Dashboard-Konfiguration abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    const config = await DashboardConfig.findOne({
      where: { user_id: userId },
    });

    if (config) {
      res.json({
        layout: JSON.parse(config.layout),
        widgets: JSON.parse(config.widgets),
      });
    } else {
      res.json({ layout: null, widgets: null });
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Dashboard-Konfiguration:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

module.exports = router;
