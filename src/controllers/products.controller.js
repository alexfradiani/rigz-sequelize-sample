const express = require('express');
const { Product, Catalog, Spec, Promo } = require('../database/models');
const { ApiError } = require('../middlewares/error.middleware');

class ProductsController {
  routes() {
    const router = express.Router();

    router.post('/create', this.create.bind(this));
    router.post('/setcatalog', this.setCatalog.bind(this));
    router.post('/setspec', this.setSpec.bind(this));
    router.get('/getdetailed', this.getDetailed.bind(this));

    return router;
  }

  async create(req, res) {
    const product = await Product.create(
      { ...req.body },
      {
        fields: ['name', 'price', 'label', 'year', 'brand']
      }
    );
    return res.send({ product: product.toJSON() });
  }

  async setCatalog(req, res, next) {
    const product = await Product.findByPk(req.body.productId);
    const catalog = await Catalog.findByPk(req.body.catalogId);

    if (!product || !catalog) {
      return next(new ApiError(400, Errors.InvalidProductOrCatalog));
    }
    await product.setCatalog(catalog);

    return res.send({ status: 'success' });
  }

  async setSpec(req, res, next) {
    const product = await Product.findByPk(req.body.productId);
    if (!product) return next(new ApiError(400, Errors.InvalidProduct));

    const spec = await Spec.create(
      { ...req.body.spec },
      {
        fields: ['manufacturer', 'components', 'releaseDate', 'regulations']
      }
    );
    await product.setSpec(spec);

    return res.send({ status: 'success' });
  }

  async getDetailed(req, res) {
    const product = await Product.findByPk(req.body.productId, {
      include: [Spec, Catalog, Promo]
    });

    return res.send({ product: product.toJSON() });
  }
}

const Errors = {
  InvalidProduct: 'InvalidProduct',
  InvalidProductOrCatalog: 'InvalidProductOrCatalog'
};

module.exports = { ProductsController, Errors };
