'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products', // name of Source table
      'catalogId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Catalogs', // name of Target table
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn(
      'Products', // name of Source table
      'catalogId' // key we want to remove
    );
  }
};
