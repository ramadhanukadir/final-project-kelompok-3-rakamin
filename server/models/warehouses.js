"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouses.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Warehouses.hasMany(models.Orders, {
        foreignKey: "warehouses_id",
      });
      Warehouses.hasMany(models.Orders, {
        foreignKey: "warehouses_id",
      });
      Warehouses.hasMany(models.Warehouses_Stock, {
        foreignKey: "warehouses_id",
      });
      Warehouses.hasMany(models.Expenses, {
        foreignKey: "warehouses_id",
      });
    }
  }
  Warehouses.init(
    {
      users_id: DataTypes.INTEGER,
      name: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      address: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      postal_code: DataTypes.INTEGER,
      telephone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Warehouses",
    }
  );
  return Warehouses;
};
