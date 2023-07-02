"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Customers", [
      {
        users_id: 1,
        full_name: "John Doe",
        address: "jl. kayu putih bogor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        full_name: "John Smith",
        address: "123 Main Street, Anytown, USA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        full_name: "Emma Johnson",
        address: "456 Elm Avenue, Springfield, USA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        full_name: "Michael Brown",
        address: "789 Oak Road, Cityville, USA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
