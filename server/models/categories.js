"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasMany(models.Items, {
        foreignKey: "categories_id",
      });
      Categories.belongsTo(models.Users);
    }
  }
  Categories.init(
    {
      users_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
