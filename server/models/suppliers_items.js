"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suppliers_Items.belongsTo(models.Suppliers, {
        foreignKey: "suppliers_id",
      });
      Suppliers_Items.belongsTo(models.Items, {
        foreignKey: "items_id",
      });
    }
  }
  Suppliers_Items.init(
    {
      items_id: DataTypes.INTEGER,
      suppliers_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Suppliers_Items",
    }
  );
  return Suppliers_Items;
};
