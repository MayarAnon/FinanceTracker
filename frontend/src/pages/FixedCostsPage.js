import React from "react";
import FixedCostForm from "../components/FixedCostForm";
import FixedCostList from "../components/FixedCostList";
import Navbar from "../components/Navbar";
import "../styles/FixedCostsPage.css";

function FixedCostsPage() {
  const [refresh, setRefresh] = React.useState(false);

  const handleFixedCostAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="fixed-costs-page">
      <Navbar />
      <div className="fixed-costs-content">
        <FixedCostForm onFixedCostAdded={handleFixedCostAdded} />
        <FixedCostList key={refresh} />
      </div>
    </div>
  );
}

export default FixedCostsPage;
