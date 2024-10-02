const express = require("express");
const router = express.Router();
const {
  Transaction,
  Budget,
  Goal,
  FixedCost,
} = require("../models/associations");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { amount, date, description, type, budget_id, goal_id } = req.body;

    // Validierung, dass budget_id dem Benutzer gehört
    if (type === "expense" && budget_id) {
      const budget = await Budget.findOne({
        where: { id: budget_id, user_id: req.userId },
      });
      if (!budget) {
        return res
          .status(400)
          .json({ message: "Ungültiges Budget ausgewählt" });
      }
    }
    // Validierung, dass goal_id dem Benutzer gehört
    if (type === "saving" && goal_id) {
      const goal = await Goal.findOne({
        where: { id: goal_id, user_id: req.userId },
      });
      if (!goal) {
        return res.status(400).json({ message: "Ungültiges Ziel ausgewählt" });
      }
    }
    const transaction = await Transaction.create({
      user_id: req.userId,
      amount,
      date,
      description,
      type,
      budget_id: type === "expense" ? budget_id : null,
      goal_id: type === "saving" ? goal_id : null,
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Fehler beim Erstellen der Transaktion:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.userId },
      include: [
        { model: Budget, attributes: ["name"] },
        { model: Goal, attributes: ["name"] },
        { model: FixedCost, attributes: ["name"] },
      ],
      order: [["date", "DESC"]],
    });
    res.json(transactions);
  } catch (error) {
    console.error("Fehler beim Abrufen der Transaktionen:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});
// Transaktion löschen
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaktion nicht gefunden" });
    }

    await transaction.destroy();
    res.json({ message: "Transaktion gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen der Transaktion:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});
module.exports = router;
