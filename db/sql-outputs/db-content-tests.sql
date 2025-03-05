\c nc_news

\! echo "---All Articles---";
SELECT * FROM articles;

\! echo "---All Comments---";
SELECT * FROM comments;

\! echo "---All topics---";
SELECT * FROM topics;

\! echo "---All Users---";
SELECT * FROM users;

\! echo "---Articles Joins---";
select articles.article_id, articles.topic, topics.slug, articles.author, users.username
from articles
join topics on topics.slug = articles.topic
join users on users.username =articles.author;

\! echo "---Comment Joins---";
select comments.comment_id, articles.article_id, comments.article_id, users.username, comments.author
from comments
join articles on articles.article_id = comments.article_id
join users on users.username = comments.author;