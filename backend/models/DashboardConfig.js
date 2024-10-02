const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class DashboardConfig extends Model {}

DashboardConfig.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    layout: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    widgets: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DashboardConfig",
    tableName: "dashboard_configs",
    timestamps: false,
  }
);

module.exports = DashboardConfig;
