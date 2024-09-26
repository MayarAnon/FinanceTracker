const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, async (req, res) => {
  const { amount, category, date, description, type } = req.body;
  try {
    const transaction = await Transaction.create(
      req.userId,
      amount,
      category,
      date,
      description,
      type
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.findByUserId(req.userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;
