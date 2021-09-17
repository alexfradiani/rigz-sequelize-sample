'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductPromos', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      promoId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('ProductPromos');
  }
};
