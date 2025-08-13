const {
    fetchArticleById,
    fetchArticles,
    updateArticleVotes,
    fetchCommentsByArticleId,
    createNewComment,
    createNewArticle,
    deleteArticle,
} = require("../models/articles.model");

exports.getArticles = async (request, response, next) => {
    try {
        const queryParams = request.query;
        const articles = await fetchArticles(queryParams);
        response.status(200).send({ articles });
    } catch (error) {
        next(error);
    }
};

exports.getArticlesById = async (request, response, next) => {
    try {
        const { article_id } = request.params;
        const article = await fetchArticleById(article_id);
        response.status(200).send({ article });
    } catch (error) {
        next(error);
    }
};

exports.patchArticle = async (request, response, next) => {
    try {
        const {
            params: { article_id },
            body: { addOrRemoveVotes },
        } = request;
        const updatedArticle = await updateArticleVotes(
            article_id,
            addOrRemoveVotes
        );
        response.status(200).send({ article: updatedArticle });
    } catch (error) {
        next(error);
    }
};

exports.getCommentsByArticleId = async (request, response, next) => {
    try {
        const { article_id } = request.params;
        const comments = await fetchCommentsByArticleId(article_id);
        response.status(200).send({ comments });
    } catch (error) {
        next(error);
    }
};

exports.deleteArticleByArticleId = async (request, response, next) => {
    try {
        const { article_id } = request.params;
        await deleteArticle(article_id);
        response.status(204).send();
    } catch (error) {
        next(error);
    }
};

exports.postNewArticle = async (request, response, next) => {
    try {
        const { body } = request;
        const newArticle = await createNewArticle(body);
        response.status(201).send({ article: newArticle });
    } catch (error) {
        next(error);
    }
};

exports.postCommentbyArticleId = async (request, response, next) => {
    try {
        const {
            params: { article_id },
            body,
        } = request;
        const newComment = await createNewComment(article_id, body);
        response.status(201).send({ comment: newComment });
    } catch (error) {
        next(error);
    }
};
