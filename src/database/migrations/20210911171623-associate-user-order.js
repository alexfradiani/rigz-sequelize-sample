'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Orders', // name of Source table
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target table
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source table
      'userId' // key we want to remove
    );
  }
};
