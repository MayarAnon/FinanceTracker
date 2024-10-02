"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("transactions", "goal_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "goals",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("transactions", "goal_id");
  },
};
