import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/GoalList.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const fetchGoals = async () => {
    try {
      const response = await api.get("/goals/progress");
      setGoals(response.data);
    } catch (error) {
      setError("Fehler beim Abrufen der Goals.");
      console.error("Fehler beim Abrufen der Goals", error);
    } finally {
      setLoading(false); // Ladezustand beenden
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Möchtest du dieses Goal wirklich löschen?")) {
      try {
        await api.delete(`/goals/${id}`);
        alert("Goal gelöscht!");
        fetchGoals();
      } catch (error) {
        setError("Fehler beim Löschen des Goals.");
        console.error("Fehler beim Löschen des Goals", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString()
      : "Kein Datum";
  };

  return (
    <div className="goal-list-container">
      <Typography variant="h6" gutterBottom className="goal-list-title">
        Financial Goals
      </Typography>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Fehlermeldung anzeigen */}
      {loading ? (
        <div className="loading">Goals werden geladen...</div>
      ) : (
        <List className="goal-list">
          {goals.map((goal) => (
            <ListItem key={goal.id} divider>
              <ListItemText
                primary={goal.name}
                secondary={`Gespart: ${goal.total_saved || 0}€ / ${
                  goal.target_amount
                }€ ${
                  goal.due_date ? `- Fällig: ${formatDate(goal.due_date)}` : ""
                }`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(goal.id)}
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

export default GoalList;
