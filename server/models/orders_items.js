"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders_Items.belongsTo(models.Orders, {
        foreignKey: "orders_id",
      });
      Orders_Items.belongsTo(models.Items, {
        foreignKey: "items_id",
      });
    }
  }
  Orders_Items.init(
    {
      orders_id: DataTypes.INTEGER,
      items_id: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      revenue: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders_Items",
    }
  );
  return Orders_Items;
};
