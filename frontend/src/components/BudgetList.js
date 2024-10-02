import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/BudgetList.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const fetchBudgets = async () => {
    try {
      const response = await api.get("/budgets");
      setBudgets(response.data);
    } catch (error) {
      setError("Fehler beim Abrufen der Budgets.");
      console.error("Fehler beim Abrufen der Budgets", error);
    } finally {
      setLoading(false); // Ladezustand beenden
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this budget?")) {
      try {
        await api.delete(`/budgets/${id}`);
        alert("Budget deleted!");
        fetchBudgets();
      } catch (error) {
        setError("Error deleting budget.");
        console.error("Error deleting budget", error);
      }
    }
  };

  return (
    <div className="budget-list-container">
      <Typography variant="h6" gutterBottom>
        Budgets
      </Typography>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Fehlermeldung anzeigen */}
      {loading ? (
        <div className="loading">Budgets werden geladen...</div>
      ) : (
        <List className="budget-list">
          {budgets.map((budget) => (
            <ListItem key={budget.id} divider>
              <ListItemText
                primary={budget.name}
                secondary={`Betrag: ${Number(budget.amount).toFixed(2)}€`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(budget.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default BudgetList;
