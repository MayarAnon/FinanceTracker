import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Aktualisierte Transaktionen:", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Transaktionen", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTransactions();
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setTransactions([]); // Transaktionsliste leeren
    navigate("/");
  };

  return (
    <div>
      <h2>Willkommen, {userEmail}!</h2>
      <button onClick={handleLogout}>Abmelden</button>
      <AddTransaction onTransactionAdded={fetchTransactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Dashboard;
