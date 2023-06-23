"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", [
      {
        users_id: 1,
        categories_id: 1,
        name: "Apel",
        SKU: "FR1",
        size: 10,
        weight: 10,
        description: "lorem ipsum",
        image_url: "",
        base_price: 10000,
        selling_price: 12000,
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
