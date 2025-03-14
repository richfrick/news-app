const {
  fetchCommentsByArticleId,
  createNewComment,
  removeComment,
} = require('../models/comments.model');

exports.deleteComment = async (request, response, next) => {
  try {
    const { comment_id } = request.params;
    await removeComment(comment_id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
