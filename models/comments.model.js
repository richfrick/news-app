const db = require('../db/connection');

exports.fetchCommentsByArticleId = async (article_id) => {
  const { rows } = await db.query(
    'SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at ASC',
    [article_id]
  );

  return rows;
};
