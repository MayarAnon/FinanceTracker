import React from "react";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import Navbar from "../components/Navbar";
import "../styles/GoalPage.css";

function GoalsPage() {
  const [refresh, setRefresh] = React.useState(false);

  const handleGoalAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="goals-page">
      <Navbar />
      <div className="goals-content">
        <GoalForm onGoalAdded={handleGoalAdded} />
        <GoalList key={refresh} />
      </div>
    </div>
  );
}

export default GoalsPage;
