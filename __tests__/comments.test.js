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

describe("GET: /api/articles/:article_id/comments", () => {
    it("200: all comments for a specific article will be returned", async () => {
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/1/comments");
        expect(status).toBe(200);
        expect(comments.length).toBe(11);
    });
    it("200: response objects will contain comment_id, votes, created_at, author, body, article_id", async () => {
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/1/comments");
        expect(status).toBe(200);
        comments.forEach((comment) => {
            expect(comment).toEqual({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
            });
        });
    });
    it("200: response will be filtered in descending date order", async () => {
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/1/comments");
        expect(status).toBe(200);
        expect(comments).toBeSorted({
            key: "created_at",
            descending: true,
        });
        expect(comments[0]).toEqual({
            comment_id: 5,
            votes: 0,
            created_at: "2020-11-03T21:00:00.000Z",
            author: "icellusedkars",
            body: "I hate streaming noses",
            article_id: 1,
        });
    });
    it("200: a request to a valid article_id with no comments will return an empty array", async () => {
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/2/comments");
        expect(status).toBe(200);
        expect(comments).toEqual([]);
    });
    it("404: not found response is returned when the article_id is not in the db", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).get("/api/articles/99/comments");
        expect(status).toBe(404);
        expect(msg).toEqual("Not Found");
    });
    it("400: bad request will be returned if the article_id is the wrong type", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).get("/api/articles/foo/comments");
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request");
    });
});

describe("POST: /api/articles/:article_id/comments", () => {
    it("201: new comment can be created for a valid article article_id", async () => {
        const { status, body } = await request(app)
            .post("/api/articles/2/comments")
            .send({
                author: "icellusedkars",
                body: "foo bar",
            });
        expect(status).toBe(201);
        expect(body).not.toBe(null);
    });

    it("201: new comment will respond with the posted comment", async () => {
        const { status, body } = await request(app)
            .post("/api/articles/2/comments")
            .send({
                author: "icellusedkars",
                body: "foo bar",
            });
        expect(status).toBe(201);
        expect(body.comment[0].body).toEqual("foo bar");
    });

    it("201: new comment will assign correct values to comment_id, votes, created_at, author, body, article_id", async () => {
        await request(app).post("/api/articles/2/comments").send({
            author: "icellusedkars",
            body: "foo bar",
        });
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/2/comments");
        expect(status).toBe(200);
        expect(comments.length).toBe(1);
        expect(comments[0]).toEqual({
            comment_id: 19,
            votes: 0,
            created_at: expect.any(String),
            author: "icellusedkars",
            body: "foo bar",
            article_id: 2,
        });
    });

    it("201: new comment with extra keys in the request body will still create the comment and ignore the extra key", async () => {
        await request(app).post("/api/articles/2/comments").send({
            author: "icellusedkars",
            body: "foo bar",
            test: "test",
        });
        const {
            status,
            body: { comments },
        } = await request(app).get("/api/articles/2/comments");
        expect(status).toBe(200);
        expect(comments.length).toBe(1);
        expect(comments[0]).toEqual({
            comment_id: 19,
            votes: 0,
            created_at: expect.any(String),
            author: "icellusedkars",
            body: "foo bar",
            article_id: 2,
        });
    });

    it("404: will respond with a not found if the article_id does not exist", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/99/comments").send({
            author: "icellusedkars",
            body: "foo bar",
        });
        expect(status).toBe(404);
        expect(msg).toEqual("Not Found");
    });

    it("400: will respond with bad request if the article_id is the wrong type", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/foo/comments").send({
            author: "icellusedkars",
            body: "foo bar",
        });
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request");
    });

    it("404: will respond with a not found when the author is not in the db", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/2/comments").send({
            author: "foo",
            body: "foo bar",
        });
        expect(status).toBe(404);
        expect(msg).toEqual("Not Found");
    });

    it("404: will respond with a not found when the author is the wrong type", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/2/comments").send({
            author: 2,
            body: "foo bar",
        });
        expect(status).toBe(404);
        expect(msg).toEqual("Not Found");
    });

    it("400: will respond with a bad request when the body key is null", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/2/comments").send({
            author: "icellusedkars",
            body: null,
        });
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request: invalid request body");
    });

    it("400: will return bad request if the request body the body key", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/2/comments").send({
            body: null,
        });
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request: invalid request body");
    });

    it("400: will return with bad request if the request body is missing author", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).post("/api/articles/2/comments").send({
            body: null,
        });
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request: invalid request body");
    });
});

describe("DELETE: /api/comments/:comment_id", () => {
    it("204: comment is deleted when provided a comment_id that exists", async () => {
        const { status, body } = await request(app).delete("/api/comments/3");
        expect(status).toBe(204);
        expect(body).toBeEmpty();

        const {
            body: { comments },
        } = await request(app).get("/api/articles/1/comments");
        expect(comments.length).toBe(10);
    });

    it("404: not found returned when the comment_id does not exist", async () => {
        async () => {
            const {
                status,
                body: { msg },
            } = await request(app).delete("/api/comments/99");
            expect(status).toBe(404);
            expect(msg).toEqual("Not Found");
        };
    });

    it("400: bad request returned if comment_id is not an int", async () => {
        const {
            status,
            body: { msg },
        } = await request(app).delete("/api/comments/foo");
        expect(status).toBe(400);
        expect(msg).toEqual("Bad Request");
    });
});
