"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Warehouses_Stocks", [
      {
        users_id: 1,
        warehouses_id: 1,
        items_id: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        warehouses_id: 2,
        items_id: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        warehouses_id: 3,
        items_id: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        warehouses_id: 4,
        items_id: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
