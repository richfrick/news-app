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

  if (!author || !body) {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request: invalid request body',
    });
  }

  await checkExists('articles', 'article_id', article_id);
  await checkExists('users', 'username', author);
  const queryStr = format(
    'INSERT INTO comments (article_id, author, body) VALUES (%L) RETURNING body',
    requestParams
  );

  const { rows } = await db.query(queryStr);

  return rows;
};

exports.removeComment = async (comment_id) => {
  await db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
};
