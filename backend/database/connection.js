const { Sequelize } = require('sequelize');
const { DB } = require('../config/globals');

class Connection {
  constructor() {
    this.sequelize = null;
  }

  connect() {
    this.sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
      dialect: 'mysql',
      host: DB.HOST
    });
  }

  get() {
    if (this.sequelize) return this.sequelize;

    throw new Error('Database connection not established.');
  }
}

module.exports = new Connection();
