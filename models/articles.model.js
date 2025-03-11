const db = require('../db/connection');

exports.fetchArticles = async () => {
  const { rows } = await db.query(
    `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.comment_id)::INT as comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id 
    GROUP BY articles.article_id
    ORDER BY created_at DESC;`
  );
  return rows;
};

exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM articles WHERE article_id=$1',
    [id]
  );

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: `Not Found: article_id ${id}` });
  }

  return rows[0];
};
