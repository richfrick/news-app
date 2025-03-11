require('jest-sorted');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const request = require('supertest');
const app = require('../app/app');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('GET: /api/articles/:article_id/comments', () => {
  it('200: all comments for a specific article will be returned', async () => {
    const {
      status,
      body: { comments },
    } = await request(app).get('/api/articles/1/comments');
    expect(status).toBe(200);
    expect(comments.length).toBe(11);
  });
  it('200: response objects will contain comment_id, votes, created_at, author, body, article_id', async () => {
    const {
      status,
      body: { comments },
    } = await request(app).get('/api/articles/1/comments');
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
  it('200: response will be filtered in ascending date order', async () => {
    const {
      status,
      body: { comments },
    } = await request(app).get('/api/articles/1/comments');
    expect(status).toBe(200);
    expect(comments).toBeSorted({ key: 'created_at', descending: false });
    expect(comments[0]).toEqual({
      comment_id: 9,
      votes: 0,
      created_at: '2020-01-01T03:08:00.000Z',
      author: 'icellusedkars',
      body: 'Superficially charming',
      article_id: 1,
    });
  });
  it('404: not found response is returned when the article_id is not in the db', async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get('/api/articles/99/comments');
    expect(status).toBe(404);
    expect(msg).toEqual('Not Found: article_id 99');
  });
  it('400: bad request will be returned if the article_id is the wrong type', async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get('/api/articles/foo/comments');
    expect(status).toBe(400);
    expect(msg).toEqual('Bad Request');
  });
});
