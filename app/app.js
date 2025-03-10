const express = require('express');
const endpoints = require('../endpoints.json');
const {
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors,
} = require('../controllers/error.controllers');
const { getTopics } = require('../controllers/topics.controllers');
const { getArticlesById } = require('../controllers/articles.contoller');
const app = express();

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints });
});

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById);

app.all('/*', (_, response) => {
  response.status(404).send({ msg: 'route not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
