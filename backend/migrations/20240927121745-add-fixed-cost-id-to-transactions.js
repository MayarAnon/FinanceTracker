"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("transactions", "fixed_cost_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "fixed_costs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("transactions", "fixed_cost_id");
  },
};
