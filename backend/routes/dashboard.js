const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  Transaction,
  Budget,
  Goal,
  FixedCost,
} = require("../models/associations");
const { Op, Sequelize } = require("sequelize");

// Dashboard-Daten abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Unabhängige Parameter für jedes Widget
    const {
      incomeExpenseTimeframe,
      balanceTimeframe,
      budgetOverviewMonth,
      expensesByBudgetMonth,
    } = req.query;

    // Zeitrahmen für incomeExpenseChart berechnen
    let incomeExpenseStartDate = new Date(0); // Standard: alle Daten
    const incomeExpenseEndDate = new Date(); // Aktuelles Datum

    if (incomeExpenseTimeframe && incomeExpenseTimeframe !== "all") {
      incomeExpenseStartDate = new Date();
      incomeExpenseStartDate.setMonth(
        incomeExpenseEndDate.getMonth() - parseInt(incomeExpenseTimeframe) + 1
      );
      incomeExpenseStartDate.setDate(1);
    }

    // Zeitrahmen für balanceChart berechnen
    let balanceStartDate = new Date(0); // Standard: alle Daten
    const balanceEndDate = new Date();

    if (balanceTimeframe && balanceTimeframe !== "all") {
      balanceStartDate = new Date();
      balanceStartDate.setMonth(
        balanceEndDate.getMonth() - parseInt(balanceTimeframe) + 1
      );
      balanceStartDate.setDate(1);
    }

    // Monat für budgetsOverview festlegen
    let budgetOverviewStartDate = new Date();
    let budgetOverviewEndDate = new Date();
    if (budgetOverviewMonth) {
      const year = budgetOverviewStartDate.getFullYear();
      budgetOverviewStartDate = new Date(
        year,
        parseInt(budgetOverviewMonth) - 1,
        1
      );
      budgetOverviewEndDate = new Date(year, parseInt(budgetOverviewMonth), 0); // Letzter Tag des Monats
    }

    // Monat für expensesByBudget festlegen
    let expensesByBudgetStartDate = new Date();
    let expensesByBudgetEndDate = new Date();
    if (expensesByBudgetMonth) {
      const year = expensesByBudgetStartDate.getFullYear();
      expensesByBudgetStartDate = new Date(
        year,
        parseInt(expensesByBudgetMonth) - 1,
        1
      );
      expensesByBudgetEndDate = new Date(
        year,
        parseInt(expensesByBudgetMonth),
        0
      );
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    const currentYear = currentDate.getFullYear();
    // Transaktionen für incomeExpenseChart abrufen
    const incomeExpenseTransactions = await Transaction.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [incomeExpenseStartDate, incomeExpenseEndDate],
        },
      },
      attributes: ["id", "amount", "type", "date"],
      order: [["date", "ASC"]],
    });

    // Transaktionen für balanceChart abrufen
    const balanceTransactions = await Transaction.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [balanceStartDate, balanceEndDate],
        },
      },
      attributes: ["id", "amount", "type", "date"],
      order: [["date", "ASC"]],
    });

    // Budgetausgaben für budgetsOverview abrufen
    const budgetOverviewTransactions = await Transaction.findAll({
      where: {
        user_id: userId,
        type: "expense",
        date: {
          [Op.between]: [budgetOverviewStartDate, budgetOverviewEndDate],
        },
      },
      attributes: [
        "budget_id",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total_spent"],
      ],
      group: ["budget_id"],
    });

    // Budgetausgaben für expensesByBudget abrufen
    const expensesByBudgetTransactions = await Transaction.findAll({
      where: {
        user_id: userId,
        type: "expense",
        date: {
          [Op.between]: [expensesByBudgetStartDate, expensesByBudgetEndDate],
        },
      },
      attributes: [
        "budget_id",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total_spent"],
      ],
      group: ["budget_id"],
    });

    // Ziele abrufen
    const goals = await Goal.findAll({
      where: { user_id: userId },
      attributes: ["id", "name", "target_amount", "due_date"],
    });

    // Budgets abrufen
    const budgets = await Budget.findAll({
      where: { user_id: userId },
      attributes: ["id", "name", "amount"],
    });

    // Fortschritt der Ziele abrufen (zeitlich unbegrenzt)
    const goalProgress = await Transaction.findAll({
      where: {
        user_id: userId,
        type: "saving",
      },
      attributes: [
        "goal_id",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total_saved"],
      ],
      group: ["goal_id"],
    });

    // Fixkosten abrufen
    const fixedCosts = await FixedCost.findAll({
      where: { user_id: userId },
      attributes: [
        "id",
        "name",
        "amount",
        "frequency",
        "start_date",
        "end_date",
      ],
    });

    // Monatliche Fixkosten berechnen (bleibt unverändert)
    let totalMonthlyFixedCosts = 0;
    fixedCosts.forEach((fc) => {
      const startDate = new Date(fc.start_date);
      const endDate = fc.end_date ? new Date(fc.end_date) : null;

      if (startDate <= currentDate && (!endDate || endDate >= currentDate)) {
        let monthlyAmount = 0;
        const amount = parseFloat(fc.amount) || 0;

        switch (fc.frequency) {
          case "daily":
            const daysInMonth = new Date(
              currentYear,
              currentMonth + 1,
              0
            ).getDate();
            monthlyAmount = amount * daysInMonth;
            break;
          case "weekly":
            const weeksInMonth = 4;
            monthlyAmount = amount * weeksInMonth;
            break;
          case "monthly":
            monthlyAmount = amount;
            break;
          case "yearly":
            monthlyAmount = amount / 12;
            break;
          default:
            monthlyAmount = 0;
            break;
        }

        totalMonthlyFixedCosts += monthlyAmount;
      }
    });

    // Gesamtvermögen (Net Worth) berechnen
    const totalIncomeResult = await Transaction.findOne({
      where: {
        user_id: userId,
        type: "income",
      },
      attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "total"]],
      raw: true,
    });
    const totalIncome = parseFloat(totalIncomeResult?.total) || 0;

    const totalExpensesResult = await Transaction.findOne({
      where: {
        user_id: userId,
        type: "expense",
      },
      attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "total"]],
      raw: true,
    });
    const totalExpenses = parseFloat(totalExpensesResult?.total) || 0;
    const netWorth = totalIncome - totalExpenses;
    res.json({
      incomeExpenseTransactions,
      balanceTransactions,
      budgetOverviewTransactions,
      expensesByBudgetTransactions,
      goals,
      budgets,
      goalProgress,
      fixedCosts,
      totalMonthlyFixedCosts,
      netWorth, // Gesamtvermögen hinzufügen
      currentMonth: currentMonth + 1,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen des Dashboards:", error);
    res.status(500).json({ message: "Serverfehler", error });
  }
});

module.exports = router;
