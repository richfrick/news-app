const articlesRouter = require('express').Router();
const {
  getArticlesById,
  getArticles,
  patchArticle,
  getCommentsByArticleId,
  postCommentbyArticleId,
} = require('../../controllers/articles.contoller');

articlesRouter.get('/', getArticles);

articlesRouter.route('/:article_id').get(getArticlesById).patch(patchArticle);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentbyArticleId);

module.exports = articlesRouter;
