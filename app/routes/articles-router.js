const articlesRouter = require("express").Router();
const {
    getArticlesById,
    getArticles,
    patchArticle,
    getCommentsByArticleId,
    postCommentbyArticleId,
    postNewArticle,
    deleteArticleByArticleId,
} = require("../../controllers/articles.contoller");

articlesRouter.route("/").get(getArticles).post(postNewArticle);

articlesRouter
    .route("/:article_id")
    .get(getArticlesById)
    .patch(patchArticle)
    .delete(deleteArticleByArticleId);

articlesRouter
    .route("/:article_id/comments")
    .get(getCommentsByArticleId)
    .post(postCommentbyArticleId);

module.exports = articlesRouter;
