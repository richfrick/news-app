const express = require('express');
const endpoints = require('../endpoints.json');
const {
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors,
} = require('../controllers/error.controllers');
const { getTopics } = require('../controllers/topics.controllers');
const {
  getArticlesById,
  getArticles,
  patchArticle,
} = require('../controllers/articles.contoller');
const {
  getCommentsByArticleId,
  postCommentbyArticleId,
  deleteComment,
} = require('../controllers/comments.controller');
const { getUsers } = require('../controllers/users.controller');
const app = express();

app.use(express.json());

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints });
});

app.get('/api/healthz', (request, response) => {
  response.status(200).send({msg: 'all good'});
});

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.get('/api/topics', getTopics);

app.get('/api/users', getUsers);

app.post('/api/articles/:article_id/comments', postCommentbyArticleId);

app.patch('/api/articles/:article_id', patchArticle);

app.delete('/api/comments/:comment_id', deleteComment);

app.all('/*', (_, response) => {
  response.status(404).send({ msg: 'route not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
