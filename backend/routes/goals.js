const express = require("express");
const router = express.Router();
const { Goal } = require("../models/associations");
const authenticateToken = require("../middleware/auth");
const { Sequelize } = require("sequelize");
// Ziel erstellen
router.post("/", authenticateToken, async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, user_id: req.userId });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Alle Ziele abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { user_id: req.userId } });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Ziel aktualisieren
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!goal) return res.status(404).json({ message: "Ziel nicht gefunden" });

    await goal.update(req.body);
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});

// Ziel löschen
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });
    if (!goal) return res.status(404).json({ message: "Ziel nicht gefunden" });

    await goal.destroy();
    res.json({ message: "Ziel gelöscht" });
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error });
  }
});
router.get("/progress", authenticateToken, async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { user_id: req.userId },
      attributes: [
        "id",
        "name",
        "target_amount",
        "due_date",
        [
          Sequelize.literal(`(
            SELECT COALESCE(SUM("amount"), 0)
            FROM "transactions" AS "Transaction"
            WHERE
              "Transaction"."goal_id" = "Goal"."id"
              AND "Transaction"."type" = 'saving'
          )`),
          "total_saved",
        ],
      ],
    });

    res.json(goals);
  } catch (error) {
    console.error("Fehler beim Abrufen der Ziele:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

module.exports = router;
