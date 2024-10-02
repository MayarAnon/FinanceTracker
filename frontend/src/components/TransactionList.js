import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import "../styles/TransactionList.css"; // Importiere die CSS-Datei

function TransactionList({ transactions, onTransactionDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this transaction?")) {
      try {
        await api.delete(`/transactions/${id}`);
        alert("Transaction deleted!");
        onTransactionDeleted();
      } catch (error) {
        console.error("Error deleting the transaction", error);
      }
    }
  };

  return (
    <div className="transaction-list-container">
      <Typography variant="h6" gutterBottom className="transaction-list-title">
        Transactions
      </Typography>
      <List className="transaction-list">
        {transactions.map((t) => (
          <ListItem
            key={t.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(t.id)}
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            }
            className="transaction-list-item"
          >
            <ListItemText
              primary={`${new Date(t.date).toLocaleDateString()} - ${
                t.type.charAt(0).toUpperCase() + t.type.slice(1)
              } - ${Number(t.amount).toFixed(2)}€`}
              secondary={
                t.Budget
                  ? `Budget: ${t.Budget.name}`
                  : t.Goal
                  ? `Goal: ${t.Goal.name}`
                  : t.fixed_cost_id
                  ? `Fixed Costs: ${t.FixedCost ? t.FixedCost.name : ""}`
                  : ""
              }
              className="transaction-item-text"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TransactionList;
