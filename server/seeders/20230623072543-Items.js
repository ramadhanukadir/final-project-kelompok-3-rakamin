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
      {
        users_id: 1,
        categories_id: 1,
        name: "Pizza Margherita",
        SKU: "PIZZ001",
        size: 10,
        weight: 12,
        description:
          "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil",
        image_url: "",
        base_price: 150000,
        selling_price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        categories_id: 1,
        name: "Beef Burger",
        SKU: "BURG003",
        size: 10,
        weight: 10,
        description:
          "Juicy beef patty with lettuce, tomato, cheese, and special sauce in a sesame bun.",
        image_url: "",
        base_price: 100000,
        selling_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        categories_id: 1,
        name: "Chicken Caesar Salad",
        SKU: "SALD002",
        size: 10,
        weight: 300,
        description:
          "Crispy romaine lettuce, grilled chicken, Parmesan cheese, and Caesar dressing",
        image_url: "",
        base_price: 75000,
        selling_price: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        categories_id: 1,
        name: "Spaghetti Bolognese",
        SKU: "PASTA004",
        size: 10,
        weight: 250,
        description:
          "Classic pasta dish with ground beef, tomato sauce, and Parmesan cheese.",
        image_url: "",
        base_price: 120000,
        selling_price: 160000,
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
