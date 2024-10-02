const User = require("./User");
const Budget = require("./Budget");
const Goal = require("./Goal");
const Transaction = require("./Transaction");
const FixedCost = require("./FixedCost");
const DashboardConfig = require("./DashboardConfig");
// User und Budget
User.hasMany(Budget, { foreignKey: "user_id" });
Budget.belongsTo(User, { foreignKey: "user_id" });

// User und Goal
User.hasMany(Goal, { foreignKey: "user_id" });
Goal.belongsTo(User, { foreignKey: "user_id" });

// User und Transaction
User.hasMany(Transaction, { foreignKey: "user_id" });
Transaction.belongsTo(User, { foreignKey: "user_id" });

// Budget und Transaction
Transaction.belongsTo(Budget, { foreignKey: "budget_id" });
Budget.hasMany(Transaction, { foreignKey: "budget_id" });
//Goal und Transaction
Transaction.belongsTo(Goal, { foreignKey: "goal_id" });
Goal.hasMany(Transaction, { foreignKey: "goal_id" });
//FixedCost und User
FixedCost.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(FixedCost, { foreignKey: "user_id" });
//FixedCost und Transaction
Transaction.belongsTo(FixedCost, { foreignKey: "fixed_cost_id" });
FixedCost.hasMany(Transaction, { foreignKey: "fixed_cost_id" });
//DashboardConfig und Users
User.hasOne(DashboardConfig, { foreignKey: "user_id" });
DashboardConfig.belongsTo(User, { foreignKey: "user_id" });
module.exports = {
  User,
  Budget,
  Goal,
  Transaction,
  FixedCost,
  DashboardConfig,
};
