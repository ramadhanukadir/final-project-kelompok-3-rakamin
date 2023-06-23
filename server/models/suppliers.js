"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suppliers.belongsToMany(models.Suppliers_Items, {
        through: models.Suppliers_Items,
        foreignKey: "suppliers_id",
      });
      Suppliers.belongsTo(models.Users, {
        foreignKey: "users_id",
      });
    }
  }
  Suppliers.init(
    {
      users_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Suppliers",
    }
  );
  return Suppliers;
};
