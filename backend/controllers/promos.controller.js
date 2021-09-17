const express = require('express');
const { Promo, Product } = require('../database/models');
const { ApiError } = require('../middlewares/error.middleware');

class PromosController {
  routes() {
    const router = express.Router();

    router.post('/create', this.create.bind(this));
    router.post('/addproduct', this.addProduct.bind(this));

    return router;
  }

  async create(req, res) {
    const starting = new Date(req.body.starting);
    const ending = new Date(req.body.ending);

    const promo = await Promo.create({
      starting,
      ending,
      label: req.body.label,
      criteria: req.body.criteria
    });

    return res.send({ promo: promo.toJSON() });
  }

  async addProduct(req, res, next) {
    const product = await Product.findByPk(req.body.productId);
    const promo = await Promo.findByPk(req.body.promoId);

    if (!product || !promo) {
      return next(new ApiError(400, Errors.InvalidProductOrPromo));
    }
    await promo.addProduct(product);

    return res.send({ status: 'ok' });
  }
}

const Errors = {
  InvalidProductOrPromo: 'InvalidProductOrPromo'
};

module.exports = { PromosController, Errors };
