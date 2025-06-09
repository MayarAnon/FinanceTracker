import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Beispiel-Icon

const NetWorthWidget = ({ netWorth }) => {
  const formatCurrency = (value) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <Card sx={{ height: "100%", boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <AccountBalanceWalletIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" component="div" color="text.secondary">
            Gesamtvermögen
          </Typography>
        </Box>
        <Typography
          variant="h4"
          component="p"
          sx={{
            fontWeight: "bold",
            color: netWorth >= 0 ? "success.main" : "error.main",
            textAlign: "center",
            my: 2,
          }}
        >
          {formatCurrency(netWorth)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Ihr aktuelles Nettokapital über alle Zeiten.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NetWorthWidget;
