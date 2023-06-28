"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Suppliers_Items", [
      {
        suppliers_id: 1,
        items_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        suppliers_id: 1,
        items_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        suppliers_id: 1,
        items_id: 3,
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
