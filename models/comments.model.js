const db = require('../db/connection');
const format = require('pg-format');
const { checkExists } = require('../db/seeds/utils');

exports.fetchCommentsByArticleId = async (article_id) => {
  await checkExists('articles', 'article_id', article_id);
  const { rows } = await db.query(
    'SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at ASC',
    [article_id]
  );

  return rows;
};

exports.createNewComment = async (article_id, reqBody) => {
  const { author, body } = reqBody;
  const requestParams = [article_id, author, body];

  const queryStr = format(
    'INSERT INTO comments (article_id, author, body) VALUES (%L) RETURNING body',
    requestParams
  );

  const { rows } = await db.query(queryStr);

  return rows;
};
