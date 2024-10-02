import React from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import Navbar from "../components/Navbar";
import "../styles/BudgetPage.css";

function BudgetsPage() {
  const [refresh, setRefresh] = React.useState(false);

  const handleBudgetAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="budgets-page">
      <Navbar />
      <div className="budgets-content">
        <BudgetForm onBudgetAdded={handleBudgetAdded} />
        <BudgetList key={refresh} />
      </div>
    </div>
  );
}

export default BudgetsPage;
