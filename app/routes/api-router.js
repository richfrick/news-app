const apiRouter = require('express').Router();
const endpoints = require('../../endpoints.json');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require('./topics-router');

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter);

apiRouter.get('/', (request, response) => {
  response.status(200).send({ endpoints });
});

module.exports = apiRouter;
