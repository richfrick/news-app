const format = require('pg-format');
const db = require('../db/connection');
const { checkExists } = require('../db/seeds/utils');

exports.fetchArticles = async (queryParams) => {
  const { sort_by, order, topic } = queryParams;
  const validSortParams = [
    'article_id',
    'title',
    'topic',
    'author',
    'body',
    'created_at',
    'votes',
    'article_img_url',
  ];
  const validOrders = ['asc', 'desc'];

  if (
    (sort_by && !validSortParams.includes(sort_by)) ||
    (order && !validOrders.includes(order))
  ) {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request, invalid query param or value',
    });
  }

  let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.comment_id)::INT as comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id 
    `;

  if (topic) {
    await checkExists('topics', 'slug', topic);
    queryStr += format(` WHERE topic = '%s'`, topic);
  }

  if (!sort_by && order) {
    queryStr += format(
      ' GROUP BY articles.article_id ORDER BY created_at %s;',
      order
    );
  } else if (sort_by && !order) {
    queryStr += format(
      ' GROUP BY articles.article_id ORDER BY %s DESC;',
      sort_by
    );
  } else if (sort_by && order) {
    queryStr += format(
      ' GROUP BY articles.article_id ORDER BY %s %s;',
      sort_by,
      order
    );
  } else {
    queryStr += ' GROUP BY articles.article_id ORDER BY created_at DESC ;';
  }

  const { rows } = await db.query(queryStr);

  return rows;
};

exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT articles.*, COUNT(comments.comment_id)::INT as comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id=$1
    GROUP BY articles.article_id;`,
    [id]
  );

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: `Not Found: article_id ${id}` });
  }

  return rows[0];
};

exports.updateArticleVotes = async (id, votes) => {
  if (typeof votes != 'number') {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request: invalid request body',
    });
  }

  await checkExists('articles', 'article_id', id);
  const { rows } = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
    [votes, id]
  );
  return rows[0];
};
