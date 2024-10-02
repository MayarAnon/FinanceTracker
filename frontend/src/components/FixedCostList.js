import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/FixedCostList.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function FixedCostList() {
  const [fixedCosts, setFixedCosts] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen

  const fetchFixedCosts = async () => {
    try {
      const response = await api.get("/fixed-costs");
      setFixedCosts(response.data);
    } catch (error) {
      setError("Fehler beim Abrufen der Fixed Costs.");
      console.error("Fehler beim Abrufen der Fixed Costs", error);
    } finally {
      setLoading(false); // Ladezustand beenden
    }
  };

  useEffect(() => {
    fetchFixedCosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Möchtest du dieses Fixed Cost wirklich löschen?")) {
      try {
        await api.delete(`/fixed-costs/${id}`);
        alert("Fixed Cost gelöscht!");
        fetchFixedCosts();
      } catch (error) {
        setError("Fehler beim Löschen des Fixed Costs.");
        console.error("Fehler beim Löschen des Fixed Costs", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString()
      : "Kein Datum";
  };

  return (
    <div className="fixed-cost-list-container">
      <Typography variant="h6" gutterBottom>
        Fixed Costs
      </Typography>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Fehlermeldung anzeigen */}
      {loading ? (
        <div className="loading">Fixed Costs werden geladen...</div>
      ) : (
        <List className="fixed-cost-list">
          {fixedCosts.map((fixedCost) => (
            <ListItem key={fixedCost.id} divider>
              <ListItemText
                primary={fixedCost.name}
                secondary={`Betrag: ${Number(fixedCost.amount).toFixed(2)}€ - ${
                  fixedCost.frequency
                } (von ${formatDate(fixedCost.start_date)}${
                  fixedCost.end_date
                    ? ` bis ${formatDate(fixedCost.end_date)}`
                    : ""
                })`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(fixedCost.id)}
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

export default FixedCostList;
