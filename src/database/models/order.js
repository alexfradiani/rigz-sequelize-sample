'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      dueDate: DataTypes.DATE,
      requirements: DataTypes.STRING,
      amount: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Order'
    }
  );
  return Order;
};
