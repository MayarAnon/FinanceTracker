import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";

function GoalsProgress({ goals, goalProgress }) {
  // Mapping von goal_id zu total_saved für schnellen Zugriff
  const progressMap = {};
  goalProgress.forEach((gp) => {
    progressMap[gp.goal_id] = parseFloat(gp.total_saved);
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Goals Achievement
      </Typography>
      <List>
        {goals.map((goal) => {
          const saved = progressMap[goal.id] || 0;
          const percentage = (saved / goal.target_amount) * 100;
          const isCompleted = percentage >= 100; // Prüfen, ob das Ziel erreicht ist
          const dueDate = goal.due_date
            ? new Date(goal.due_date).toLocaleDateString()
            : "No due date";

          return (
            <ListItem key={goal.id}>
              <ListItemText
                primary={
                  <>
                    {goal.name} (Due on: {dueDate}) {isCompleted && "🎉"}{" "}
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      {saved.toFixed(2)}€ / {goal.target_amount}€
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={percentage > 100 ? 100 : percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: isCompleted
                          ? "rgba(76,175,80,0.3)" // Hintergrund grün bei 100%
                          : undefined,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: isCompleted
                            ? "green" // Fortschritt grün bei 100%
                            : undefined,
                        },
                      }}
                    />
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default GoalsProgress;
