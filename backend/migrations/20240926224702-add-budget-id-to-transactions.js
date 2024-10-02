"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("transactions", "budget_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "budgets",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("transactions", "budget_id");
  },
};
