const {
  fetchCommentsByArticleId,
  createNewComment,
  removeComment,
} = require('../models/comments.model');

// exports.getCommentsByArticleId = async (request, response, next) => {
//   try {
//     const { article_id } = request.params;
//     const comments = await fetchCommentsByArticleId(article_id);
//     response.status(200).send({ comments });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.postCommentbyArticleId = async (request, response, next) => {
//   try {
//     const {
//       params: { article_id },
//       body,
//     } = request;
//     const newComment = await createNewComment(article_id, body);
//     response.status(201).send({ comment: newComment });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteComment = async (request, response, next) => {
  try {
    const { comment_id } = request.params;
    await removeComment(comment_id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
