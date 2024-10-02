import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import BudgetsPage from "./pages/BudgetsPage";
import GoalsPage from "./pages/GoalsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FixedCostsPage from "./pages/FixedCostsPage";
import TransactionsPage from "./pages/TransactionsPage";
const theme = createTheme({
  // Sie können hier Ihr eigenes Theme anpassen
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Öffentliche Routen */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />

          {/* Geschützte Routen */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <BudgetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <GoalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fixed-costs"
            element={
              <ProtectedRoute>
                <FixedCostsPage />
              </ProtectedRoute>
            }
          />
          {/* Fallback für unbekannte Routen */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
