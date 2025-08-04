const db = require("../connection");
const format = require("pg-format");
const {
    formatTopicsSeedingData,
    convertTimestampToDate,
    createLookup,
} = require("../seeds/utils");

const seed = async ({ topicData, userData, articleData, commentData }) => {
    try {
        await db.query(`DROP TABLE IF EXISTS comments;`),
            await db.query(`DROP TABLE IF EXISTS articles;`),
            await db.query(`DROP TABLE IF EXISTS users;`),
            await db.query(`DROP TABLE IF EXISTS topics;`),
            await createTopics(),
            await createUsers(),
            await createArticles(),
            await createComments(),
            await seedTopics(topicData);
        await seedUsers(userData);
        const insertedArticleData = await seedArticles(articleData);
        await seedComments(commentData, insertedArticleData.rows);
    } catch (error) {
        console.log("SEEDING FAILED:", error);
    }
};

function createTopics() {
    return db.query(`CREATE TABLE topics (
    slug VARCHAR(150) PRIMARY KEY NOT NULL,
    description VARCHAR(150) NOT NULL,
    img_url VARCHAR(1000))`);
}

function seedTopics(topicData) {
    const formattedTopicData = formatTopicsSeedingData(topicData);
    const dataInsertQuery = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formattedTopicData
    );
    return db.query(dataInsertQuery);
}

function createUsers() {
    return db.query(`CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(1000))`);
}

function seedUsers(userData) {
    const formattedUserData = userData.map(({ username, name, avatar_url }) => {
        return [username, name, avatar_url];
    });
    const usersInsertQuery = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formattedUserData
    );
    return db.query(usersInsertQuery);
}

function createArticles() {
    return db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    topic VARCHAR(150) REFERENCES topics(slug) NOT NULL,
    author VARCHAR(50) REFERENCES users(username) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    article_img_url VARCHAR(1000))`);
}

function seedArticles(articleData) {
    const formattedArticleData = articleData.map((article) => {
        const createdAtFormatted = convertTimestampToDate({
            created_at: article.created_at,
        });
        return [
            article.title,
            article.topic,
            article.author,
            article.body,
            createdAtFormatted.created_at,
            article.votes || 0,
            article.article_img_url,
        ];
    });
    const articlesInsertQuery = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) 
    VALUES %L RETURNING *`,
        formattedArticleData
    );
    return db.query(articlesInsertQuery);
}

function createComments() {
    return db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY NOT NULL,
    article_id INT REFERENCES articles(article_id) NOT NULL,
    body TEXT NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    author VARCHAR(50) REFERENCES users(username) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp)`);
}

function seedComments(commentsData, articleData) {
    try {
        //create article lookup and use article_title to inserd the article_id, use the createLookup util
        const articleLookup = createLookup(articleData, "title", "article_id");

        //convert created_at timestamp using convertTimestampToDate
        const formattedCommentData = commentsData.map((comment) => {
            const createdAtInCorrectFormat = convertTimestampToDate({
                created_at: comment.created_at,
            });

            return [
                articleLookup[comment.article_title],
                comment.body,
                comment.votes,
                comment.author,
                createdAtInCorrectFormat.created_at,
            ];
        });
        const commentsInsertQuery = format(
            `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
            formattedCommentData
        );
        return db.query(commentsInsertQuery);
    } catch (error) {
        console.log(error);
    }
}

module.exports = seed;
