import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import TimeframeSelector from "./TimeframeSelector";
function BalanceChart({ transactions, balanceTimeframe, setBalanceTimeframe }) {
  const data = prepareYearlyData(transactions);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Balance (Profit/Loss)
      </Typography>
      <TimeframeSelector
        value={balanceTimeframe}
        onChange={(e) => setBalanceTimeframe(e.target.value)}
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toFixed(2)}€`} />
          <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function prepareYearlyData(transactions) {
  // Gruppieren Sie Transaktionen nach Monat und berechnen Sie den Profit/Loss
  const groupedData = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!groupedData[month]) {
      groupedData[month] = { month, Balance: 0 };
    }

    const amount = parseFloat(t.amount) || 0;

    if (t.type === "income") {
      groupedData[month].Balance += amount;
    } else if (t.type === "expense" || t.type === "fixed_cost") {
      groupedData[month].Balance -= amount;
    }
  });

  // In ein Array umwandeln und sortieren
  const data = Object.values(groupedData).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return data;
}

export default BalanceChart;
