"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Items.belongsTo(models.Categories, {
        foreignKey: "categories_id",
      });
      Items.hasMany(models.Suppliers_Items, {
        foreignKey: "items_id",
      });
      Items.belongsToMany(models.Orders, {
        through: models.Orders_Items,
        foreignKey: "items_id",
      });
      Items.hasMany(models.Warehouses_Stock, {
        foreignKey: "warehouses_id",
      });
      Items.hasMany(models.Expenses, {
        foreignKey: "items_id",
      });
    }
  }
  Items.init(
    {
      users_id: DataTypes.INTEGER,
      categories_id: DataTypes.INTEGER,
      name: {
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      SKU: {
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      size: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
      base_price: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      selling_price: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Items",
    }
  );
  return Items;
};
