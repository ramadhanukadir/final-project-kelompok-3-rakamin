"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouses_Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouses_Stock.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Warehouses_Stock.belongsTo(models.Warehouses, {
        foreignKey: "warehouses_id",
      });
      Warehouses_Stock.belongsTo(models.Items, {
        foreignKey: "items_id",
      });
    }
  }
  Warehouses_Stock.init(
    {
      users_id: DataTypes.INTEGER,
      warehouses_id: DataTypes.INTEGER,
      items_id: DataTypes.INTEGER,
      stock: {
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Warehouses_Stock",
    }
  );
  return Warehouses_Stock;
};
