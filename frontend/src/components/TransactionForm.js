import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/TransactionForm.css"; // Importiere die CSS-Datei
import { Typography } from "@mui/material";
function TransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense"); // 'income', 'expense', 'saving'
  const [budgetId, setBudgetId] = useState("");
  const [goalId, setGoalId] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  useEffect(() => {
    const fetchBudgetsAndGoals = async () => {
      try {
        const [budgetsResponse, goalsResponse] = await Promise.all([
          api.get("/budgets"),
          api.get("/goals"),
        ]);
        setBudgets(budgetsResponse.data);
        setGoals(goalsResponse.data);
      } catch (error) {
        console.error("Fehler beim Abrufen von Budgets und Zielen", error);
      }
    };

    fetchBudgetsAndGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Fehlermeldung zurücksetzen
    try {
      await api.post("/transactions", {
        amount,
        date,
        description,
        type,
        budget_id: type === "expense" ? budgetId : null,
        goal_id: type === "saving" ? goalId : null,
      });
      alert("Transaction added!");
      onTransactionAdded();
      // Felder zurücksetzen
      setAmount("");
      setDate("");
      setDescription("");
      setType("expense");
      setBudgetId("");
      setGoalId("");
    } catch (error) {
      setError(
        "Fehler beim Hinzufügen der Transaktion. Bitte versuche es erneut."
      ); // Fehlermeldung setzen
      console.error(error);
    }
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <Typography variant="h6" gutterBottom>
          Add New Transaction
        </Typography>
        <div className="form-group">
          <label>Amount (€):</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="saving">Saving</option>
          </select>
        </div>
        {type === "expense" && (
          <div className="form-group">
            <label>Budget:</label>
            <select
              value={budgetId}
              onChange={(e) => setBudgetId(e.target.value)}
              required
            >
              <option value="">Select Budget</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {type === "saving" && (
          <div className="form-group">
            <label>Goal:</label>
            <select
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              required
            >
              <option value="">Select Goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Fehlermeldung anzeigen */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
