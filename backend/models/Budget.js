// models/budget.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Budget extends Model {}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Budget",
    tableName: "budgets",
    timestamps: false,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Budget;
