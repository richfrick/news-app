const commentsRouter = require('express').Router();
const {
  getCommentsByArticleId,
  postCommentbyArticleId,
  deleteComment,
} = require('../../controllers/comments.controller');

commentsRouter.delete('/:comment_id', deleteComment);

module.exports = commentsRouter;
