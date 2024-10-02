"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("goals", "current_amount");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("goals", "current_amount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },
};
