const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const { UsersController } = require('./controllers/users.controller');
const { CatalogsController } = require('./controllers/catalogs.controller');
const { ProductsController } = require('./controllers/products.controller');
const { PromosController } = require('./controllers/promos.controller');
const { E2EController } = require('./controllers/e2e.controller');

const { RATELIMIT, IN_TESTING } = require('./config/globals');

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

// only available during testing
if (IN_TESTING) {
  const e2eCtrl = new E2EController();
  app.use('/e2e', e2eCtrl.routes());
}

// generic error middleware handler
app.use((err, _req, res, _next) => {
  ErrorMiddleware.handler(err, res);
});

module.exports = app;
