'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Specs', // name of Source table
      'productId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // name of Target table
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn(
      'Specs', // name of Source table
      'productId' // key we want to remove
    );
  }
};
