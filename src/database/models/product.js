'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasOne(models.Spec, {
        foreignKey: {
          allowNull: false
        }
      });

      Product.belongsTo(models.Catalog);

      Product.belongsToMany(models.Promo, { through: 'ProductPromos' });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      label: DataTypes.STRING,
      year: DataTypes.INTEGER,
      brand: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  );
  return Product;
};
