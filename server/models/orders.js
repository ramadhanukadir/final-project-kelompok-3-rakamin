"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
      Orders.belongsTo(models.Customers, {
        foreignKey: "customers_id",
      });
      Orders.belongsTo(models.Warehouse, {
        foreignKey: "warehouse_id",
      });
      Orders.hasMany(models.Orders_Items, {
        foreignKey: "orders_id",
      });
    }
  }
  Orders.init(
    {
      users_id: DataTypes.INTEGER,
      customers_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
