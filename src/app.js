const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const { UsersController } = require('./controllers/users.controller');

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

// generic error middleware handler
app.use((err, _req, res, _next) => {
  ErrorMiddleware.handler(err, res);
});

module.exports = app;
