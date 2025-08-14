const articlesUrl = (articleId) =>
    `/api/articles${articleId ? `/${articleId}` : ""}`;

const validRequestBody = {
    author: "rogersop",
    title: "test title",
    body: "test body",
    topic: "cats",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};
const requestBodyWithNoImage = {
    author: "rogersop",
    title: "test title",
    body: "test body",
    topic: "cats",
};
const requestBodyWithExtraKeyValue = {
    author: "rogersop",
    title: "test title",
    body: "test body",
    topic: "cats",
    foo: "bar",
};
const requestBodyWithInvalidTopic = {
    author: "rogersop",
    title: "test title",
    body: "test body",
    topic: "foo",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};
const requestBodyWithInvalidAuthor = {
    author: "fooBar",
    title: "test title",
    body: "test body",
    topic: "cats",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};

const requestBodyWithNoAuthor = {
    title: "test title",
    body: "test body",
    topic: "cats",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};

const requestBodyWithNoTitle = {
    author: "rogersop",
    body: "test body",
    topic: "cats",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};

const requestBodyWithNoBody = {
    author: "rogersop",
    title: "test title",
    topic: "cats",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};

const requestBodyWithNoTopic = {
    author: "rogersop",
    title: "test title",
    body: "test body",
    article_img_url:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
};

module.exports = {
    articlesUrl,
    validRequestBody,
    requestBodyWithNoImage,
    requestBodyWithExtraKeyValue,
    requestBodyWithInvalidAuthor,
    requestBodyWithInvalidTopic,
    requestBodyWithNoAuthor,
    requestBodyWithNoTitle,
    requestBodyWithNoBody,
    requestBodyWithNoTopic,
};
