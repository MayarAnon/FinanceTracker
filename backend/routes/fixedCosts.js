const express = require("express");
const router = express.Router();
const { FixedCost } = require("../models/associations");
const authenticateToken = require("../middleware/auth");

// Fixkosten erstellen
router.post("/", authenticateToken, async (req, res) => {
  try {
    const fixedCost = await FixedCost.create({
      ...req.body,
      user_id: req.userId,
    });
    res.status(201).json(fixedCost);
  } catch (error) {
    console.error("Fehler beim Erstellen der Fixkosten:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Alle Fixkosten abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const fixedCosts = await FixedCost.findAll({
      where: { user_id: req.userId },
    });
    res.json(fixedCosts);
  } catch (error) {
    console.error("Fehler beim Abrufen der Fixkosten:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Fixkosten aktualisieren
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const fixedCost = await FixedCost.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!fixedCost)
      return res.status(404).json({ message: "Fixkosten nicht gefunden" });

    await fixedCost.update(req.body);
    res.json(fixedCost);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Fixkosten:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Fixkosten löschen
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const fixedCost = await FixedCost.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!fixedCost)
      return res.status(404).json({ message: "Fixkosten nicht gefunden" });

    await fixedCost.destroy();
    res.json({ message: "Fixkosten gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen der Fixkosten:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

module.exports = router;
