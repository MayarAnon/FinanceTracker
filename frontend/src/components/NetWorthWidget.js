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

/**
 * Widget zur Darstellung des Net Worth Verlaufs
 */
function NetWorthWidget({ transactions = [], timeframe, setTimeframe }) {
  const data = prepareNetWorthData(transactions, timeframe);
  console.log("📊 Net Worth Data:", data);

  return (
    <div>
      {/* Zeitraum-Auswahl */}
      <TimeframeSelector
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
      />

      {/* Fallback bei fehlenden Daten */}
      {data.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Keine Daten verfügbar.
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? `${value.toFixed(2)} €` : value
              }
            />
            <Line
              type="monotone"
              dataKey="NetWorth"
              stroke="#4caf50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function prepareNetWorthData(transactions, timeframe) {
  const allData = Object.values(buildGrouped(transactions)).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  if (timeframe === "all") return allData;

  const monthsBack = parseInt(timeframe, 10);
  const now = new Date();
  const result = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const found = allData.find((entry) => entry.month === key);

    result.push({
      month: key,
      NetWorth: found ? found.NetWorth : result.at(-1)?.NetWorth ?? 0,
    });
  }

  return result;
}


/**
 * Gruppiert Transaktionen nach Monat und berechnet den kumulierten Net Worth
 */
function buildGrouped(transactions, cutoff = null) {
  const grouped = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    if (cutoff && date < cutoff) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!grouped[key]) {
      grouped[key] = { month: key, NetWorth: 0 };
    }

    if (t.type === "income") {
      grouped[key].NetWorth += parseFloat(t.amount);
    } else if (t.type === "expense") {
      grouped[key].NetWorth -= parseFloat(t.amount);
    }
  });

  // Kumulierten Net Worth berechnen
  const sortedKeys = Object.keys(grouped).sort();
  let runningTotal = 0;

  sortedKeys.forEach((key) => {
    runningTotal += grouped[key].NetWorth;
    grouped[key].NetWorth = runningTotal;
  });

  return grouped;
}

export default NetWorthWidget;
