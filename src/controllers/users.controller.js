const express = require('express');
const faker = require('faker');
const { User, sequelize } = require('../database/models');
const { ApiError } = require('../middlewares/error.middleware');

class UsersController {
  routes() {
    const router = express.Router();

    router.get('/connectioncheck', this.connectionCheck.bind(this));
    router.post('/createone', this.createOne.bind(this));
    router.post('/createbulk', this.createBulk.bind(this));

    return router;
  }

  async connectionCheck(_req, res, next) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      res.send({ status: 'ok' });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return next(new ApiError(400, Errors.SequelizeError));
    }
  }

  async createOne(_req, res) {
    const someone = User.build({
      name: 'Neil',
      email: 'gaiman@books.com'
    });
    await someone.save();
    return res.send({ user: someone.toJSON() });
  }

  async createBulk(_req, res) {
    const randomUsers = [];
    for (let i = 0; i < 100; i++) {
      randomUsers.push({
        name: faker.name.firstName(),
        email: faker.internet.email()
      });
    }

    await User.bulkCreate(randomUsers);
    return res.send({ userscreated: randomUsers.length });
  }
}

const Errors = {
  SequelizeError: 'SequelizeError'
};

module.exports = { UsersController, Errors };
