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
    router.get('/getby', this.getBy.bind(this));
    router.get('/getrecent', this.getRecent.bind(this));
    router.post('/update', this.update.bind(this));
    router.post('/delete', this.delete.bind(this));

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
      name: faker.name.firstName(),
      email: faker.internet.email()
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

  async getBy(req, res, next) {
    let user = null;
    switch (req.body.by) {
      case 'id':
        user = await User.findByPk(req.body.value);
        break;
      case 'email':
        user = await User.findOne({ where: { email: req.body.value } });
        break;
    }

    if (user) return res.send(user.toJSON());

    return next(new ApiError(400, Errors.UserNotFound));
  }

  async getRecent(_req, res) {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    return res.send(users);
  }

  async update(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });
    user.name = req.body.newName;
    await user.save();

    return res.send(user.toJSON());
  }

  async delete(req, res) {
    await User.destroy({ where: { email: req.body.email } });

    return res.send({ result: 'user erased' });
  }
}

const Errors = {
  SequelizeError: 'SequelizeError',
  UserNotFound: 'UserNotFound'
};

module.exports = { UsersController, Errors };
