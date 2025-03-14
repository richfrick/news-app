const apiRouter = require('express').Router();
const endpoints = require('../../endpoints.json');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require('./topics-router');
const usersRouter = require('./users-routers');

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.get('/', (request, response) => {
  response.status(200).send({ endpoints });
});

apiRouter.get('/healthz', (request, response) => {
  response.status(200).send({ msg: 'all good' });
});

module.exports = apiRouter;
