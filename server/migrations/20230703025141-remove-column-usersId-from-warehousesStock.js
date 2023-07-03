'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn('Warehouses_Stocks', 'users_id');
  },

  async down(queryInterface, Sequelize) {},
};
