const { fetchArticleById, fetchArticles } = require('../models/articles.model');

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
