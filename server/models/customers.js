"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customers.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Customers.hasMany(models.Orders, {
        foreignKey: "customers_id",
      });
    }
  }
  Customers.init(
    {
      users_id: DataTypes.INTEGER,
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customers",
    }
  );
  return Customers;
};
