'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    static associate(models) {
      Promo.belongsToMany(models.Product, { through: 'ProductPromos' });
    }
  }
  Promo.init(
    {
      starting: DataTypes.DATE,
      ending: DataTypes.DATE,
      label: DataTypes.STRING,
      criteria: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Promo'
    }
  );
  return Promo;
};
