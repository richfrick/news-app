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

describe('Articles Endpoint', () => {
  describe('GET: /api/articles', () => {
    it.todo(
      '200: for each article will return author, title, article_id, topic, created_at, votes, article_img_url, comment_count'
    );
    it.todo('200: articles will be sorted in decending date order by default')
    it.todo('200: body does not appear in the any of the response objects')
    it.todo('200: article with no comments shows a comment_count of 0')
  });
  

  describe('GET: /api/articles/:article_id', () => {
    it('200: article object will contain author, title, article_id, body, topic, created_at, votes, article_img_url', async () => {
      const {
        status,
        body: { article },
      } = await request(app).get('/api/articles/2');
      expect(status).toBe(200);
      expect(article).toMatchObject({
        article_id: expect.any(Number),
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
      });
      expect([null, expect.any(String)]).toContain(article.article_img_url);
    });
    it('200: an individual article can be retrieved by id', async () => {
      const {
        status,
        body: { article },
      } = await request(app).get('/api/articles/2');
      expect(status).toBe(200);
      console.log(article);
      expect([article].length).toBe(1);
      expect(article).toEqual({
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell. Some years ago..',
        created_at: '2020-10-16T05:03:00.000Z',
        votes: 0,
        article_img_url: null,
      });
    });

    it('400: bad request should be returned when an non integer is used for article_id', async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get('/api/articles/foo');
      expect(status).toBe(400);
      expect(msg).toBe('Bad Request, incorrect type used in SQL query');
    });
    it('404: not found will be returned if the article_id does not exist', async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get('/api/articles/99999999');
      expect(status).toBe(404);
      expect(msg).toBe('Not Found: article_id 99999999');
    });
  });
});
