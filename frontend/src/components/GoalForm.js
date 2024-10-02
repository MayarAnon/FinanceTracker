import React, { useState } from "react";
import api from "../api";
import "../styles/GoalForm.css";
import { Typography } from "@mui/material";
function GoalForm({ onGoalAdded }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Fehlermeldung zurücksetzen
    try {
      await api.post("/goals", {
        name,
        target_amount: targetAmount,
        due_date: dueDate || null,
      });
      alert("Goal hinzugefügt!");
      onGoalAdded(); // Aktualisiert die Zielliste
      setName("");
      setTargetAmount("");
      setDueDate("");
    } catch (error) {
      setError("Fehler beim Hinzufügen des Goals. Bitte versuche es erneut."); // Fehlermeldung setzen
      console.error(error);
    }
  };

  return (
    <div className="goal-form-container">
      <form onSubmit={handleSubmit} className="goal-form">
        <Typography variant="h6" gutterBottom>
          Neues Goal hinzufügen
        </Typography>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Goalname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Amount (€):</label>
          <input
            type="number"
            step="0.01"
            placeholder="TargetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date (optional):</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Fehlermeldung anzeigen */}
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default GoalForm;
