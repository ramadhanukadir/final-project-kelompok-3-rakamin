"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Items, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Categories, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Suppliers, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Customers, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Orders, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Warehouse, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Warehouses_Stock, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Expenses, {
        foreignKey: "user_id",
      });
    }
  }
  Users.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
