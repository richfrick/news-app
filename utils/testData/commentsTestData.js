const commentsUrlByAccountId = (articleId) =>
    `/api/articles${articleId ? `/${articleId}` : ""}/comments`;

const validCommentRequestBody = {
    author: "icellusedkars",
    body: "foo bar",
};

module.exports = { commentsUrlByAccountId, validCommentRequestBody };
