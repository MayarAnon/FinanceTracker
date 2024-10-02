// migrations/XXXXXX-remove-dates-from-budgets.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("budgets", "start_date");
    await queryInterface.removeColumn("budgets", "end_date");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("budgets", "start_date", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
    await queryInterface.addColumn("budgets", "end_date", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },
};
