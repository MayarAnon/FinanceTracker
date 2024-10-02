import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import api from "../api";
import "../styles/TransactionPage.css"; // Importiere die CSS-Datei

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Transaktionen", error);
    } finally {
      setLoading(false); // Ladezustand beenden
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <Navbar />
      <div className="transactions-content">
        <TransactionForm onTransactionAdded={fetchTransactions} />
        {loading ? (
          <div className="loading">Loading transactions...</div>
        ) : (
          <TransactionList
            transactions={transactions}
            onTransactionDeleted={fetchTransactions}
          />
        )}
      </div>
    </div>
  );
}

export default TransactionsPage;
