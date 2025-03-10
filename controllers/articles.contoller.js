const { fetchArticleById } = require("../models/articles.model")

exports.getArticlesById = async(request, response, next) =>{
    const article = await fetchArticleById()
}