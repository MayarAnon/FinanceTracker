const cron = require("node-cron");
const { FixedCost, Transaction } = require("../models/associations");
const { Op } = require("sequelize");

function scheduleFixedCosts() {
  // Täglich um Mitternacht ausführen
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Überprüfe Fixkosten für heute...");
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      // Alle aktiven Fixkosten abrufen
      const fixedCosts = await FixedCost.findAll({
        where: {
          start_date: { [Op.lte]: today },
          [Op.or]: [{ end_date: null }, { end_date: { [Op.gte]: today } }],
        },
      });

      for (const fixedCost of fixedCosts) {
        // Prüfen, ob heute eine Transaktion erstellt werden soll
        const lastTransaction = await Transaction.findOne({
          where: {
            user_id: fixedCost.user_id,
            fixed_cost_id: fixedCost.id,
          },
          order: [["date", "DESC"]],
        });

        const shouldCreateTransaction = shouldCreateFixedCostTransaction(
          fixedCost,
          lastTransaction
        );

        if (shouldCreateTransaction) {
          // Transaktion erstellen
          await Transaction.create({
            user_id: fixedCost.user_id,
            amount: fixedCost.amount,
            date: today,
            description: fixedCost.description || fixedCost.name,
            type: "expense",
            budget_id: null,
            goal_id: null,
            fixed_cost_id: fixedCost.id,
          });
          console.log(`Fixkosten-Transaktion für ${fixedCost.name} erstellt.`);
        }
      }
    } catch (error) {
      console.error("Fehler beim Verarbeiten der Fixkosten:", error);
    }
  });
}

// Hilfsfunktion zur Bestimmung, ob eine Transaktion erstellt werden soll
function shouldCreateFixedCostTransaction(fixedCost, lastTransaction) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (!lastTransaction) {
    // Noch keine Transaktionen vorhanden, also erstellen
    return true;
  }

  const lastTransactionDate = lastTransaction.date;
  const frequency = fixedCost.frequency;

  // Berechnung des nächsten Fälligkeitsdatums basierend auf der Frequenz
  const nextDueDate = getNextDueDate(lastTransactionDate, frequency);

  return nextDueDate === today;
}

// Hilfsfunktion zur Berechnung des nächsten Fälligkeitsdatums
function getNextDueDate(lastDate, frequency) {
  const date = new Date(lastDate);

  switch (frequency) {
    case "daily":
      date.setDate(date.getDate() + 1);
      break;
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      throw new Error(`Unbekannte Frequenz: ${frequency}`);
  }

  return date.toISOString().slice(0, 10);
}

module.exports = scheduleFixedCosts;
