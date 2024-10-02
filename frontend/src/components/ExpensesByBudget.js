import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Typography } from "@mui/material";
import MonthSelector from "./MonthSelector";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF6666",
  "#66CCFF",
];

function ExpensesByBudget({
  budgets,
  budgetExpenses,
  expensesByBudgetMonth,
  setExpensesByBudgetMonth,
}) {
  // Mapping von budget_id zu total_spent für schnellen Zugriff
  const expenseMap = {};
  budgetExpenses.forEach((be) => {
    expenseMap[be.budget_id] = parseFloat(be.total_spent);
  });
  // Daten für das Kreisdiagramm vorbereiten
  const budgetData = budgets.map((budget, index) => ({
    name: budget.name,
    value: expenseMap[budget.id] || 0, // Nutzung des expenseMap
    fill: COLORS[index % COLORS.length], // Farbe zuweisen
  }));
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Monthly Expenses by Budgets
      </Typography>
      <MonthSelector
        value={expensesByBudgetMonth}
        onChange={(e) => setExpensesByBudgetMonth(e.target.value)}
      />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={budgetData}
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}€`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ExpensesByBudget;
