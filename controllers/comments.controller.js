const { fetchCommentsByArticleId } = require('../models/comments.model');

exports.getCommentsByArticleId = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    const comments = await fetchCommentsByArticleId(article_id);
    response.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
