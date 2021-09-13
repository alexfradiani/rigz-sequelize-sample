const express = require('express');
const { Catalog } = require('../database/models');

class CatalogsController {
  routes() {
    const router = express.Router();

    router.post('/create', this.create.bind(this));

    return router;
  }

  async create(req, res) {
    const catalog = Catalog.build({
      target: req.body.target,
      store: req.body.store
    });
    await catalog.save();
    return res.send({ catalog: catalog.toJSON() });
  }
}

module.exports = { CatalogsController };
