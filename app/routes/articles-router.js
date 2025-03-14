const articlesRouter = require('express').Router();
const {
  getArticlesById,
  getArticles,
  patchArticle,
  getCommentsByArticleId,
  postCommentbyArticleId,
} = require('../../controllers/articles.contoller');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticlesById);

articlesRouter.patch('/:article_id', patchArticle);

articlesRouter.get('/:article_id/comments', getCommentsByArticleId);

articlesRouter.post('/:article_id/comments', postCommentbyArticleId);

module.exports = articlesRouter;
