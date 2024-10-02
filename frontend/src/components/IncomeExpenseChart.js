import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import TimeframeSelector from "./TimeframeSelector";
function IncomeExpenseChart({
  transactions,
  incomeExpenseTimeframe,
  setIncomeExpenseTimeframe,
}) {
  // Daten für das Diagramm vorbereiten
  const data = prepareChartData(transactions);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Income and Expense History
      </Typography>
      <TimeframeSelector
        value={incomeExpenseTimeframe}
        onChange={(e) => setIncomeExpenseTimeframe(e.target.value)}
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(2)}€`, name]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="Incomes" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Expenses" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function prepareChartData(transactions) {
  // Gruppieren Sie Transaktionen nach Monat und Typ
  const groupedData = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!groupedData[month]) {
      groupedData[month] = { month, Incomes: 0, Expenses: 0 };
    }

    const amount = parseFloat(t.amount) || 0;

    if (t.type === "income") {
      groupedData[month].Incomes += amount;
    } else if (t.type === "expense" || t.type === "fixed_cost") {
      groupedData[month].Expenses += amount;
    }
  });

  // In ein Array umwandeln und sortieren
  const data = Object.values(groupedData).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return data;
}

export default IncomeExpenseChart;
