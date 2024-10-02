import React, { useState } from "react";
import api from "../api";
import "../styles/BudgetForm.css";
import { Typography } from "@mui/material";
function BudgetForm({ onBudgetAdded }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Fehlermeldung zurücksetzen
    try {
      await api.post("/budgets", { name, amount });
      alert("Budget Added!");
      onBudgetAdded();
      setName("");
      setAmount("");
    } catch (error) {
      setError("Error adding Budget."); // Fehlermeldung setzen
      console.error(error);
    }
  };

  return (
    <div className="budget-form-container">
      <form onSubmit={handleSubmit} className="budget-form">
        <Typography variant="h6" gutterBottom>
          Add new Budget
        </Typography>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Budgetname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount (€):</label>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Fehlermeldung anzeigen */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default BudgetForm;
