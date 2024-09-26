const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");
const authenticateToken = require("./middleware/auth");
const transactionRoutes = require("./routes/transactions");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("Backend läuft!");
});
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Dies ist eine geschützte Route." });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend läuft auf Port ${port}`);
});
