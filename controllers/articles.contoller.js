const { fetchArticleById } = require('../models/articles.model');

exports.getArticlesById = async (request, response, next) => {
  try {
    const { article_id } = request.params;
    const article = await fetchArticleById(article_id);
    response.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
