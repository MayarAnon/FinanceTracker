import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Navbar from "../components/Navbar";
import api from "../api";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import GoalsProgress from "../components/GoalsProgress";
import BudgetsOverview from "../components/BudgetsOverview";
import FixedCostsSummary from "../components/FixedCostsSummary";
import ExpensesByBudget from "../components/ExpensesByBudget";
import BalanceChart from "../components/BalanceChart";
import NetWorthWidget from "../components/NetWorthWidget";
import { Button, Menu, MenuItem, Box, Typography } from "@mui/material";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const [incomeExpenseTransactions, setIncomeExpenseTransactions] = useState(
    []
  );
  const [balanceTransactions, setBalanceTransactions] = useState([]);
  const [budgetOverviewTransactions, setBudgetOverviewTransactions] = useState(
    []
  );
  const [expensesByBudgetTransactions, setExpensesByBudgetTransactions] =
    useState([]);
  const [goals, setGoals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goalProgress, setGoalProgress] = useState([]);
  const [totalMonthlyFixedCosts, setTotalMonthlyFixedCosts] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [allTransactionsForNetWorth, setAllTransactionsForNetWorth] = useState([]);
  const [netWorthTimeframe, setNetWorthTimeframe] = useState("all");
  const [layout, setLayout] = useState([
    { i: "incomeExpenseChart", x: 0, y: 0, w: 6, h: 12 },
    { i: "goalsProgress", x: 6, y: 13, w: 6, h: 7 },
    { i: "budgetsOverview", x: 0, y: 6, w: 6, h: 5 },
    { i: "fixedCostsSummary", x: 6, y: 20, w: 6, h: 3 },
    { i: "expensesByBudget", x: 0, y: 18, w: 6, h: 10 },
    { i: "balanceChart", x: 6, y: 0, w: 6, h: 12 },
    { i: "netWorthWidget", x: 0, y: 28, w: 6, h: 14 }
  ]);
  const [incomeExpenseTimeframe, setIncomeExpenseTimeframe] = useState("6");
  const [balanceTimeframe, setBalanceTimeframe] = useState("12");
  const [budgetOverviewMonth, setBudgetOverviewMonth] = useState(
    new Date().getMonth() + 1
  );
  const [expensesByBudgetMonth, setExpensesByBudgetMonth] = useState(
    new Date().getMonth() + 1
  );
  const [availableWidgets, setAvailableWidgets] = useState([
    { key: "incomeExpenseChart", name: "Income and Expense History" },
    { key: "goalsProgress", name: "Goals Achievements" },
    { key: "budgetsOverview", name: "Budgets Overview" },
    { key: "fixedCostsSummary", name: "Monthly Fixed Costs" },
    { key: "expensesByBudget", name: "Expenses by Budget" },
    { key: "balanceChart", name: "Balance (Profit/Loss)" },
    { key: "netWorthWidget", name: "Net Worth Overview" }
  ]);

  const [widgets, setWidgets] = useState([
    "incomeExpenseChart",
    "goalsProgress",
    "budgetsOverview",
    "fixedCostsSummary",
    "expensesByBudget",
    "balanceChart",
    "netWorthWidget"
  ]);
  // Menü zum Hinzufügen von Widgets
  const [anchorEl, setAnchorEl] = useState(null);
  const getDefaultWidgetLayout = (widgetKey) => {
    return {
      i: widgetKey,
      x: (widgets.length * 6) % 12,
      y: Infinity,
      w: 6,
      h: 10,
    };
  };

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard", {
        params: {
          incomeExpenseTimeframe,
          balanceTimeframe,
          netWorthTimeframe,
          budgetOverviewMonth,
          expensesByBudgetMonth,
        },
      });
      setIncomeExpenseTransactions(response.data.incomeExpenseTransactions);
      setBalanceTransactions(response.data.balanceTransactions);
      setBudgetOverviewTransactions(response.data.budgetOverviewTransactions);
      setExpensesByBudgetTransactions(
        response.data.expensesByBudgetTransactions
      );
      setGoals(response.data.goals);
      setBudgets(response.data.budgets);
      setGoalProgress(response.data.goalProgress);
      setTotalMonthlyFixedCosts(response.data.totalMonthlyFixedCosts);
      setCurrentMonth(response.data.currentMonth);
      setAllTransactionsForNetWorth(response.data.allTransactionsForNetWorth);
    } catch (error) {
      console.error("Error retrieving the dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [
    incomeExpenseTimeframe,
    balanceTimeframe,
    budgetOverviewMonth,
    expensesByBudgetMonth,
    netWorthTimeframe,
  ]);

  const saveDashboardConfig = async () => {
    try {
      await api.post("/dashboard-config", { layout, widgets });
      alert("Dashboard configuration saved!");
    } catch (error) {
      console.error("Error saving the dashboard configuration", error);
    }
  };

  const loadDashboardConfig = async () => {
    try {
      const response = await api.get("/dashboard-config");
      if (response.data.layout && response.data.widgets) {
        setLayout(response.data.layout);
        setWidgets(response.data.widgets);
      }
    } catch (error) {
      console.error("Error loading the dashboard configuration", error);
    }
  };

  useEffect(() => {
    loadDashboardConfig();
  }, []);

  const handleAddWidgetClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddWidgetClose = () => {
    setAnchorEl(null);
  };

  const handleAddWidget = (widgetKey) => {
    if (!widgets.includes(widgetKey)) {
      setWidgets([...widgets, widgetKey]);

      const newLayout = getDefaultWidgetLayout(widgetKey);
      setLayout([...layout, newLayout]);
    }
    handleAddWidgetClose();
  };

  const handleRemoveWidget = (widgetKey) => {
    setWidgets(widgets.filter((w) => w !== widgetKey));
  };

  const handleLayoutChange = (currentLayout) => {
    setLayout(currentLayout);
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={saveDashboardConfig}
            size="small"
            sx={{
              backgroundColor: "#1abc9c",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "0.8rem",
              "&:hover": {
                backgroundColor: "#16a085",
              },
            }}
          >
            Save Dashboard
          </Button>
          <Button
            variant="contained"
            onClick={handleAddWidgetClick}
            size="small"
            sx={{
              backgroundColor: "#1abc9c",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "0.8rem",
              "&:hover": {
                backgroundColor: "#16a085",
              },
            }}
          >
            Add Widget
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAddWidgetClose}
          >
            {availableWidgets
              .filter((w) => !widgets.includes(w.key))
              .map((widget) => (
                <MenuItem
                  key={widget.key}
                  onClick={() => handleAddWidget(widget.key)}
                >
                  {widget.name}
                </MenuItem>
              ))}
          </Menu>
        </Box>

        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
          rowHeight={30}
          onLayoutChange={handleLayoutChange}
          draggableCancel=".no-drag"
        >
          {widgets.includes("incomeExpenseChart") && (
            <div key="incomeExpenseChart">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <IncomeExpenseChart
                  transactions={incomeExpenseTransactions}
                  incomeExpenseTimeframe={incomeExpenseTimeframe}
                  setIncomeExpenseTimeframe={setIncomeExpenseTimeframe}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("incomeExpenseChart")}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}

          {widgets.includes("goalsProgress") && (
            <div key="goalsProgress">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <GoalsProgress goals={goals} goalProgress={goalProgress} />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("goalsProgress")}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}

          {widgets.includes("budgetsOverview") && (
            <div key="budgetsOverview">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <BudgetsOverview
                  budgets={budgets}
                  budgetExpenses={budgetOverviewTransactions}
                  budgetOverviewMonth={budgetOverviewMonth}
                  setBudgetOverviewMonth={setBudgetOverviewMonth}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("budgetsOverview")}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}

          {widgets.includes("fixedCostsSummary") && (
            <div key="fixedCostsSummary">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <FixedCostsSummary
                  totalMonthlyFixedCosts={totalMonthlyFixedCosts}
                  currentMonth={currentMonth}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("fixedCostsSummary")}
                  sx={{ position: "absolute", top: 8, right: 8, zIndex: 100 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}

          {widgets.includes("expensesByBudget") && (
            <div key="expensesByBudget">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <ExpensesByBudget
                  budgetExpenses={expensesByBudgetTransactions}
                  budgets={budgets}
                  expensesByBudgetMonth={expensesByBudgetMonth}
                  setExpensesByBudgetMonth={setExpensesByBudgetMonth}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("expensesByBudget")}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}

          {widgets.includes("balanceChart") && (
            <div key="balanceChart">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: 2,
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="widget-drag-handle"
                  sx={{ cursor: "move" }}
                ></Typography>
                <BalanceChart
                  transactions={balanceTransactions}
                  balanceTimeframe={balanceTimeframe}
                  setBalanceTimeframe={setBalanceTimeframe}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="no-drag"
                  onClick={() => handleRemoveWidget("balanceChart")}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  Remove
                </Button>
              </Box>
            </div>
          )}
          {widgets.includes("netWorthWidget") && (
          <div key="netWorthWidget">
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: 2,
                position: "relative",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                className="widget-drag-handle"
                sx={{ cursor: "move" }}
              >
                Net Worth Overview
              </Typography>
              <NetWorthWidget
                transactions={allTransactionsForNetWorth} 
                timeframe={netWorthTimeframe}
                setTimeframe={setNetWorthTimeframe}
              />
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                className="no-drag"
                onClick={() => handleRemoveWidget("netWorthWidget")}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                Remove
              </Button>
            </Box>
          </div>
        )}

          
        </ResponsiveGridLayout>
      </Box>
    </div>
  );
}

export default Dashboard;
