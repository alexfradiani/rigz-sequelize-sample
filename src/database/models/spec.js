'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spec extends Model {
    static associate(models) {
      Spec.belongsTo(models.Product);
    }
  }
  Spec.init(
    {
      manufacturer: DataTypes.STRING,
      components: DataTypes.INTEGER,
      releaseDate: DataTypes.DATE,
      regulations: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Spec'
    }
  );
  return Spec;
};
