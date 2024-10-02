import React from "react";
import { Typography } from "@mui/material";

function FixedCostsSummary({ totalMonthlyFixedCosts, currentMonth }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Monthly fixed Costs - {monthNames[currentMonth - 1]}
      </Typography>
      <Typography variant="body1">
        Total Monthly Fixed Costs: {totalMonthlyFixedCosts}€
      </Typography>
    </div>
  );
}

export default FixedCostsSummary;
