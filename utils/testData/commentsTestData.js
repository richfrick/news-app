const commentsUrl = (articleId) =>
    `/api/articles${articleId ? `/${articleId}` : ""}/comments`;

const validCommentRequestBody = {
    author: "icellusedkars",
    body: "foo bar",
};

module.exports = { commentsUrl, validCommentRequestBody };
