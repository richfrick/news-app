const {
  fetchArticleById,
  fetchArticles,
  updateArticleVotes,
} = require('../models/articles.model');

exports.getArticles = async (request, response, next) => {
  try {
    const articles = await fetchArticles();
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
