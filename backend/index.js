const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const budgetRoutes = require("./routes/budgets");
const goalRoutes = require("./routes/goals");
const dashboardRoutes = require("./routes/dashboard");
const cors = require("cors");
const authenticateToken = require("./middleware/auth");
const fixedCostsRouter = require("./routes/fixedCosts");
const scheduleFixedCosts = require("./scheduler/fixedCostsScheduler");
const dashboardConfigRouter = require("./routes/dashboardConfig");

require("dotenv").config();

const {
  User,
  Budget,
  Goal,
  Transaction,
  FixedCost,
} = require("./models/associations");
scheduleFixedCosts();
// Middleware
app.use(cors());
app.use(express.json());

// Routen
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fixed-costs", fixedCostsRouter);
app.use("/api/dashboard-config", dashboardConfigRouter);

// Testroute
app.get("/", (req, res) => {
  res.send("Backend läuft!");
});

// Geschützte Testroute
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Dies ist eine geschützte Route." });
});

// Server starten
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend läuft auf Port ${port}`);
});
