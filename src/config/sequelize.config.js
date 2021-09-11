const { DB } = require('../config/globals');

module.exports = {
  development: {
    username: DB.USER,
    password: DB.PASSWORD,
    database: DB.DATABASE,
    host: DB.HOST,
    port: DB.PORT,
    dialect: 'mysql'
  }
};
