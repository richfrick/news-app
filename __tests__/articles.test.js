require("jest-sorted");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app/app");

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
});

describe("Articles Endpoint", () => {
    describe("GET: /api/articles", () => {
        it("200: for each article will return author, title, article_id, topic, created_at, votes, article_img_url, comment_count", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            articles.forEach((article) => {
                expect(article).toEqual({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number),
                    article_img_url: expect.any(String),
                });
            });
        });

        it("200: body does not appear in any of the response objects", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles");
            expect(status).toBe(200);
            articles.every((article) =>
                expect(article.hasOwnProperty("body")).toBe(false)
            );
        });

        it("200: articles will be sorted in decending date order by default", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles");
            expect(status).toBe(200);
            expect(articles).toBeSorted({
                key: "created_at",
                descending: true,
            });
            expect(articles[0]).toEqual({
                author: "icellusedkars",
                title: "Eight pug gifs that remind me of mitch",
                article_id: 3,
                topic: "mitch",
                created_at: "2020-11-03T09:12:00.000Z",
                votes: 0,
                comment_count: 2,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            });
        });

        it("200: sort by article_id will return a list in decending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=article_id");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({
                key: "article_id",
                descending: true,
            });
            expect(articles[0]).toEqual({
                article_id: 13,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "butter_bridge",
                comment_count: 0,
                created_at: "2020-10-11T12:24:00.000Z",
                title: "Another article about Mitch",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by title will return a list in decending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=title");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({ key: "title", descending: true });
            expect(articles[0]).toEqual({
                article_id: 7,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                comment_count: 0,
                created_at: "2020-01-07T14:08:00.000Z",
                title: "Z",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by topic will return a list in descending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=topic");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({ key: "topic", descending: true });
            expect(articles[0]).toEqual({
                article_id: 8,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                comment_count: 0,
                created_at: "2020-04-17T01:08:00.000Z",
                title: "Does Mitch predate civilisation?",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by author will return a list in descending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=author");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({ key: "author", descending: true });
            expect(articles[0]).toEqual({
                article_id: 4,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "rogersop",
                comment_count: 0,
                created_at: "2020-05-06T01:14:00.000Z",
                title: "Student SUES Mitch!",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by comment_count will return a list in descending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=commment_count");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({ key: "author", descending: true });
            expect(articles[0]).toEqual({
                article_id: 4,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "rogersop",
                comment_count: 0,
                created_at: "2020-05-06T01:14:00.000Z",
                title: "Student SUES Mitch!",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by created_at will return a list in descending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=created_at");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({
                key: "created_at",
                descending: true,
            });
            expect(articles[0]).toEqual({
                article_id: 3,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                comment_count: 2,
                created_at: "2020-11-03T09:12:00.000Z",
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: sort by votes will return a list in decending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?sort_by=votes");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({ key: "votes", descending: true });
            expect(articles[0]).toEqual({
                article_id: 1,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "butter_bridge",
                comment_count: 11,
                created_at: "2020-07-09T20:11:00.000Z",
                title: "Living in the shadow of a great man",
                topic: "mitch",
                votes: 100,
            });
        });

        it.skip("200: providing order=asc ONLY will return a list sorted by created_at in ascending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?order=asc");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({
                key: "created_at",
                descending: false,
            });
            expect(articles[0]).toEqual({
                article_id: 7,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                comment_count: 0,
                created_at: "2020-01-07T14:08:00.000Z",
                title: "Z",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: providing order=desc ONLY will return a list sorted by created_at in descending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?order=desc");
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({
                key: "created_at",
                descending: true,
            });
            expect(articles[0]).toEqual({
                article_id: 3,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                comment_count: 2,
                created_at: "2020-11-03T09:12:00.000Z",
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                votes: 0,
            });
        });

        it.skip("200: articles can be sorted by any valid coulumn in ascending order", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get(
                "/api/articles?sort_by=author&order=asc"
            );
            expect(status).toBe(200);
            expect(articles.length).toBe(13);
            expect(articles).toBeSorted({
                key: "author",
                descending: false,
            });
            expect(articles[0]).toEqual({
                article_id: 1,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "butter_bridge",
                comment_count: 11,
                created_at: "2020-07-09T20:11:00.000Z",
                title: "Living in the shadow of a great man",
                topic: "mitch",
                votes: 100,
            });
        });

        it("400: attempting to sort by a column that doesn't exist in articles will throw a bad request error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles?sort_by=foo");
            expect(status).toBe(400);
            expect(msg).toBe("Bad Request, invalid query param or value");
        });

        it("400: passing an int to sort by will return a bad request", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles?sort_by=123");
            expect(status).toBe(400);
            expect(msg).toBe("Bad Request, invalid query param or value");
        });

        it("400: passing a string onto order that is not asc or desc will return a bad request", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles?order=foo");
            expect(status).toBe(400);
            expect(msg).toBe("Bad Request, invalid query param or value");
        });

        it.skip("200: an invalid query param will be ignored and the default query is used", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?foo=bar");
            expect(status).toBe(200);
            expect(articles).toBeSorted({
                key: "created_at",
                descending: true,
            });
            expect(articles[0]).toEqual({
                author: "icellusedkars",
                title: "Eight pug gifs that remind me of mitch",
                article_id: 3,
                topic: "mitch",
                created_at: "2020-11-03T09:12:00.000Z",
                votes: 0,
                comment_count: 2,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            });
        });

        it("400: passing an int onto order will return a bad request", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles?order=123");
            expect(status).toBe(400);
            expect(msg).toBe("Bad Request, invalid query param or value");
        });

        it.skip("200: filtering by a topic with articles will return results", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?topic=cats");
            expect(status).toBe(200);
            expect(articles.length).toBe(1);
            expect(articles[0]).toEqual({
                article_id: 5,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "rogersop",
                comment_count: 2,
                created_at: "2020-08-03T13:14:00.000Z",
                title: "UNCOVERED: catspiracy to bring down democracy",
                topic: "cats",
                votes: 0,
            });
        });

        it("200: filtering by a topic with no articles will return an empty array", async () => {
            const {
                status,
                body: { articles },
            } = await request(app).get("/api/articles?topic=paper");
            expect(status).toBe(200);
            expect(articles).toEqual([]);
        });

        it("404: providing an incorrect topic throw a not found error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles?topic=123");
            expect(status).toBe(404);
            expect(msg).toEqual("Not Found");
        });
    });

    describe("GET: /api/articles/:article_id", () => {
        it.skip("200: an individual article can be retrieved by id and will contain author, title, article_id, body, topic, created_at, votes, article_img_url", async () => {
            const {
                status,
                body: { article },
            } = await request(app).get("/api/articles/2");
            expect(status).toBe(200);
            expect([article].length).toBe(1);
            expect(article).toEqual({
                article_id: 2,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago..",
                comment_count: 0,
                created_at: "2020-10-16T05:03:00.000Z",
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                votes: 0,
            });
        });

        it("200: an article with comments returns the correct count", async () => {
            await request(app).post("/api/articles/2/comments").send({
                author: "icellusedkars",
                body: "foo bar",
            });
            const {
                status,
                body: {
                    article: { comment_count },
                },
            } = await request(app).get("/api/articles/2");
            expect(status).toBe(200);
            expect(comment_count).toBe(1);
        });

        it("400: bad request should be returned when an non integer is used for article_id", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles/foo");
            expect(status).toBe(400);
            expect(msg).toBe("Bad Request");
        });

        it("404: not found will be returned if the article_id does not exist", async () => {
            const {
                status,
                body: { msg },
            } = await request(app).get("/api/articles/99");
            expect(status).toBe(404);
            expect(msg).toBe("Not Found: article_id 99");
        });
    });

    describe("PATCH: /api/articles/:article_id", () => {
        it.skip("200: votes can be incremented by x and returns the updated article", async () => {
            const {
                status,
                body: { article },
            } = await request(app)
                .patch("/api/articles/3")
                .send({ addOrRemoveVotes: 1 });
            expect(status).toBe(200);
            expect(article).toEqual({
                article_id: 3,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2020-11-03T09:12:00.000Z",
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                votes: 1,
            });
        });
        it.skip("200: votes can be decreaced by x and returns the updated article", async () => {
            const {
                status,
                body: { article },
            } = await request(app)
                .patch("/api/articles/3")
                .send({ addOrRemoveVotes: -2 });
            expect(status).toBe(200);
            expect(article).toEqual({
                article_id: 3,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2020-11-03T09:12:00.000Z",
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                votes: -2,
            });
        });
        it.skip("200: adding 0 to addOrRemoveVotes will not change the vote count", async () => {
            const {
                status,
                body: { article },
            } = await request(app)
                .patch("/api/articles/3")
                .send({ addOrRemoveVotes: 0 });
            expect(status).toBe(200);
            expect(article).toEqual({
                article_id: 3,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                author: "icellusedkars",
                body: "some gifs",
                created_at: "2020-11-03T09:12:00.000Z",
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                votes: 0,
            });
        });
        it("400: passing a non integer in addOrRemoveVotes throws a bad request error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app)
                .patch("/api/articles/3")
                .send({ addOrRemoveVotes: null });
            expect(status).toBe(400);
            expect(msg).toEqual("Bad Request: invalid request body");
        });
        it("400: attempting to update another part of the article throws a Bad Request error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app)
                .patch("/api/articles/3")
                .send({ author: "rogersop" });
            expect(status).toBe(400);
            expect(msg).toEqual("Bad Request: invalid request body");
        });
        it("404: attempting to update an article that does not exist throws a Not Found error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app)
                .patch("/api/articles/99")
                .send({ addOrRemoveVotes: 1 });
            expect(status).toBe(404);
            expect(msg).toEqual("Not Found");
        });
        it("400: passing an article_id of the wrong type throws a bad request error", async () => {
            const {
                status,
                body: { msg },
            } = await request(app)
                .patch("/api/articles/foo")
                .send({ addOrRemoveVotes: 1 });
            expect(status).toBe(400);
            expect(msg).toEqual("Bad Request");
        });
    });
});
