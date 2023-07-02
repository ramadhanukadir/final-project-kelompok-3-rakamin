'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class revenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  revenue.init({
    users_id: DataTypes.INTEGER,
    total_revenue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'revenue',
  });
  return revenue;
};