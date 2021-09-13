const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const { UsersController } = require('./controllers/users.controller');
const { CatalogsController } = require('./controllers/catalogs.controller');
const { ProductsController } = require('./controllers/products.controller');
const { PromosController } = require('./controllers/promos.controller');

const { RATELIMIT } = require('./config/globals');

const app = express();
app.use(express.json());
// set up security headers
app.use(helmet());
// rate limiter middleware
app.use(
  rateLimit({
    windowMs: RATELIMIT.WINDOW,
    max: RATELIMIT.MAX_REQUESTS,
    message: {
      status: 429,
      message: 'Too many requests, please try again later.'
    }
  })
);

const usersCtrl = new UsersController();
app.use('/users', usersCtrl.routes());

const catalogsCtrl = new CatalogsController();
app.use('/catalogs', catalogsCtrl.routes());

const productsCtrl = new ProductsController();
app.use('/products', productsCtrl.routes());

const promosCtrl = new PromosController();
app.use('/promos', promosCtrl.routes());

// generic error middleware handler
app.use((err, _req, res, _next) => {
  ErrorMiddleware.handler(err, res);
});

module.exports = app;
