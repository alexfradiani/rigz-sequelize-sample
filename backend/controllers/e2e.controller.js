const express = require('express');
const { sequelize } = require('../database/models');
const UserSeed = require('../database/seeds/user.seed');

class E2EController {
  routes() {
    const router = express.Router();

    router.post('/clear', this.clear.bind(this));
    router.post('/seedusers', this.seedUsers.bind(this));

    return router;
  }

  async clear(_req, res) {
    await sequelize.sync({ force: true });
    return res.send({ status: 'ok' });
  }

  async seedUsers(_req, res) {
    const seeds = new UserSeed();
    await seeds.createMany(50);

    return res.send({ status: 'ok' });
  }
}

module.exports = { E2EController };
