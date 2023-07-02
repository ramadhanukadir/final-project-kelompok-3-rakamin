"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Warehouses", [
      {
        users_id: 1,
        name: "PT. ABC Warehouse",
        address: "Jalan Raya Sudirman No. 123",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postal_code: "12345",
        telephone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        name: "PT. XYZ Logistics",
        address: "Jalan Ahmad Yani No. 456",
        city: "Surabaya",
        province: "Jawa Timur",
        postal_code: "67890",
        telephone: 62987654321,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        name: "PT. PQR Distribution",
        address: "Jalan Gatot Subroto No. 789",
        city: "Bandung",
        province: "Jawa Barat",
        postal_code: "54321",
        telephone: 62555123456,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        name: "PT. EFG Warehouse",
        address: "Jalan Gajah Mada No. 987",
        city: "Denpasar",
        province: "Bali",
        postal_code: "23456",
        telephone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Warehouses", null, {});
  },
};
