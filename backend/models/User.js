const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  static associate(models) {
    User.hasMany(models.Transaction, { foreignKey: "user_id" });
    User.hasMany(models.Budget, { foreignKey: "user_id" });
    User.hasMany(models.Goal, { foreignKey: "user_id" });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
