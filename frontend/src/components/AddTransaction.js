import { useState } from "react";
import axios from "axios";

function AddTransaction({ onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Ausgabe");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:4000/api/transactions",
        { amount, category, date, description, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Transaktion hinzugefügt!");
      // Aufruf der Funktion zum Aktualisieren der Transaktionen
      if (onTransactionAdded) {
        onTransactionAdded();
      }
      // Formularfelder zurücksetzen
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setType("Ausgabe");
    } catch (error) {
      alert("Fehler beim Hinzufügen der Transaktion");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Transaktion hinzufügen</h2>
      <input
        type="number"
        placeholder="Betrag"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Kategorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Ausgabe">Ausgabe</option>
        <option value="Einnahme">Einnahme</option>
      </select>
      <button type="submit">Hinzufügen</button>
    </form>
  );
}

export default AddTransaction;
