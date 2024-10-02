import React, { useState } from "react";
import api from "../api";
import "../styles/FixedCostForm.css";
import { Typography } from "@mui/material";
function FixedCostForm({ onFixedCostAdded }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Fehlermeldung zurücksetzen
    try {
      await api.post("/fixed-costs", {
        name,
        amount,
        start_date: startDate,
        end_date: endDate || null,
        frequency,
        description,
      });
      alert("Fixed Cost hinzugefügt!");
      onFixedCostAdded();
      // Felder zurücksetzen
      setName("");
      setAmount("");
      setStartDate("");
      setEndDate("");
      setFrequency("monthly");
      setDescription("");
    } catch (error) {
      setError(
        "Fehler beim Hinzufügen der Fixed Cost. Bitte versuche es erneut."
      ); // Fehlermeldung setzen
      console.error(error);
    }
  };

  return (
    <div className="fixed-cost-form-container">
      <form onSubmit={handleSubmit} className="fixed-cost-form">
        <Typography variant="h6" gutterBottom>
          Neues Fixed Cost hinzufügen
        </Typography>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Fixed Cost Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Betrag (€):</label>
          <input
            type="number"
            step="0.01"
            placeholder="Betrag"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Startdatum:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Enddatum (optional):</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Häufigkeit:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="daily">Täglich</option>
            <option value="weekly">Wöchentlich</option>
            <option value="monthly">Monatlich</option>
            <option value="yearly">Jährlich</option>
          </select>
        </div>
        <div className="form-group">
          <label>Beschreibung (optional):</label>
          <input
            type="text"
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Fehlermeldung anzeigen */}
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default FixedCostForm;
