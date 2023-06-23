"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expenses.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Expenses.belongsTo(models.Warehouses, {
        foreignKey: "warehouses_id",
      });
      Expenses.belongsTo(models.Items, {
        foreignKey: "items_id",
      });
    }
  }
  Expenses.init(
    {
      users_id: DataTypes.INTEGER,
      warehouses_id: DataTypes.INTEGER,
      items_id: DataTypes.INTEGER,
      stock_update: DataTypes.INTEGER,
      total_expenses: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expenses",
    }
  );
  return Expenses;
};
