// routes/budgets.js
const express = require("express");
const router = express.Router();

const { Budget } = require("../models/associations");
const authenticateToken = require("../middleware/auth");

// Budget erstellen
router.post("/", authenticateToken, async (req, res) => {
  try {
    const budget = await Budget.create({ ...req.body, user_id: req.userId });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Alle Budgets abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const budgets = await Budget.findAll({ where: { user_id: req.userId } });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Budget aktualisieren
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!budget)
      return res.status(404).json({ message: "Budget nicht gefunden" });

    await budget.update(req.body);
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Budget löschen
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!budget)
      return res.status(404).json({ message: "Budget nicht gefunden" });

    await budget.destroy();
    res.json({ message: "Budget gelöscht" });
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

module.exports = router;
