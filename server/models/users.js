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
        foreignKey: "users_id",
      });
      Users.hasMany(models.Categories, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Suppliers, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Customers, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Orders, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Warehouses, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Warehouses_Stock, {
        foreignKey: "users_id",
      });
      Users.hasMany(models.Expenses, {
        foreignKey: "users_id",
      });
    }
  }
  Users.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
