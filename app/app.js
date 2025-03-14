const apiRouter = require('./routes/api-router');
const express = require('express');
const {
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors,
} = require('../controllers/error.controllers');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (_, response) => {
  response.status(404).send({ msg: 'route not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
