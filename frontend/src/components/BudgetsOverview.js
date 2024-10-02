import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import MonthSelector from "./MonthSelector";

function BudgetsOverview({
  budgets,
  budgetExpenses,
  budgetOverviewMonth,
  setBudgetOverviewMonth,
}) {
  // Mapping von budget_id zu total_spent für schnellen Zugriff
  const expenseMap = {};
  budgetExpenses.forEach((be) => {
    expenseMap[be.budget_id] = parseFloat(be.total_spent);
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Budgets
      </Typography>
      <MonthSelector
        value={budgetOverviewMonth}
        onChange={(e) => setBudgetOverviewMonth(e.target.value)}
      />
      <List>
        {budgets.map((budget) => {
          const spent = expenseMap[budget.id] || 0;
          const percentage = (spent / budget.amount) * 100;

          // Wenn ausgegebenes Budget höher als das Limit ist
          const isOverBudget = spent > budget.amount;

          return (
            <ListItem key={budget.id}>
              <ListItemText
                primary={`${budget.name}: ${spent.toFixed(2)}€ / ${
                  budget.amount
                }€`}
                secondary={
                  <LinearProgress
                    variant="determinate"
                    value={percentage > 100 ? 100 : percentage}
                    sx={{
                      height: 10, // Optional: Höhere Leiste
                      borderRadius: 5,
                      backgroundColor: isOverBudget
                        ? "rgba(255,0,0,0.3)" // Leiste im Hintergrund blass rot, wenn überschritten
                        : undefined,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: isOverBudget
                          ? "red" // Leiste rot, wenn überschritten
                          : undefined,
                      },
                    }}
                  />
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default BudgetsOverview;
