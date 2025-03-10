const express = require('express');
const endpoints = require('../endpoints.json');
const { handleServerErrors } = require('../controllers/error.controllers');
const { getTopics } = require('../controllers/topics.controllers');
const app = express();

app.get('/api', (request, response) => {
  response.status(200).send( {endpoints} );
});

app.get('/api/topics', getTopics);

app.all('/*', (_, response) => {
  response.status(404).send({ msg: 'route not found' });
});

app.use(handleServerErrors);

module.exports = app;
