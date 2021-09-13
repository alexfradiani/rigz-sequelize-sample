'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(models) {
      Catalog.hasMany(models.Product);
    }
  }
  Catalog.init(
    {
      target: DataTypes.STRING,
      store: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Catalog'
    }
  );
  return Catalog;
};
