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

describe('Articles Endpoint', () => {
  describe('GET: /api/articles', () => {
    it('200: for each article will return author, title, article_id, topic, created_at, votes, article_img_url, comment_count', async () => {
      const {
        status,
        body: { articles },
      } = await request(app).get('/api/articles');
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

    it('200: articles will be sorted in decending date order by default', async () => {
      const {
        status,
        body: { articles },
      } = await request(app).get('/api/articles');
      expect(status).toBe(200);
      expect(articles).toBeSorted({ key: 'created_at', descending: true });
      expect(articles[0]).toEqual({
        author: 'icellusedkars',
        title: 'Eight pug gifs that remind me of mitch',
        article_id: 3,
        topic: 'mitch',
        created_at: '2020-11-03T09:12:00.000Z',
        votes: 0,
        comment_count: 2,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
      });
    });

    it('200: body does not appear in any of the response objects', async () => {
      const {
        status,
        body: { articles },
      } = await request(app).get('/api/articles');
      expect(status).toBe(200);
      articles.every((article) =>
        expect(article.hasOwnProperty('body')).toBe(false)
      );
    });
  });

  describe('GET: /api/articles/:article_id', () => {
    it('200: article object will contain author, title, article_id, body, topic, created_at, votes, article_img_url', async () => {
      const {
        status,
        body: { article },
      } = await request(app).get('/api/articles/2');
      expect(status).toBe(200);
      expect(article).toEqual({
        article_id: expect.any(Number),
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String),
      });
    });

    it('200: an individual article can be retrieved by id', async () => {
      const {
        status,
        body: { article },
      } = await request(app).get('/api/articles/2');
      expect(status).toBe(200);
      expect([article].length).toBe(1);
      expect(article).toEqual({
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell. Some years ago..',
        created_at: '2020-10-16T05:03:00.000Z',
        votes: 0,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
      });
    });

    it('400: bad request should be returned when an non integer is used for article_id', async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get('/api/articles/foo');
      expect(status).toBe(400);
      expect(msg).toBe('Bad Request');
    });

    it('404: not found will be returned if the article_id does not exist', async () => {
      const {
        status,
        body: { msg },
      } = await request(app).get('/api/articles/99');
      expect(status).toBe(404);
      expect(msg).toBe('Not Found: article_id 99');
    });
  });

  describe('PATCH: /api/articles/:article_id', () => {
    it('200: votes can be incremented by x and returns the updated article', async () => {
      const {
        status,
        body: { article },
      } = await request(app)
        .patch('/api/articles/3')
        .send({ addOrRemoveVotes: 1 });
      expect(status).toBe(200);
      expect(article).toEqual({
        article_id: 3,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '2020-11-03T09:12:00.000Z',
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        votes: 1,
      });
    });
    it('200: votes can be decreaced by x and returns the updated article', async () => {
      const {
        status,
        body: { article },
      } = await request(app)
        .patch('/api/articles/3')
        .send({ addOrRemoveVotes: -2 });
      expect(status).toBe(200);
      expect(article).toEqual({
        article_id: 3,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '2020-11-03T09:12:00.000Z',
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        votes: -2,
      });
    });
    it('200: adding 0 to addOrRemoveVotes will not change the vote count', async () => {
      const {
        status,
        body: { article },
      } = await request(app)
        .patch('/api/articles/3')
        .send({ addOrRemoveVotes: 0 });
      expect(status).toBe(200);
      expect(article).toEqual({
        article_id: 3,
        article_img_url:
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '2020-11-03T09:12:00.000Z',
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        votes: 0,
      });
    });
    it('400: passing a non integer in addOrRemoveVotes throws a bad request error', async () => {
      const {
        status,
        body: { msg },
      } = await request(app)
        .patch('/api/articles/3')
        .send({ addOrRemoveVotes: null });
      expect(status).toBe(400);
      expect(msg).toEqual('Bad Request: invalid request body');
    });
    it('400: attempting to update another part of the article throws a Bad Request error', async () => {
      const {
        status,
        body: { msg },
      } = await request(app)
        .patch('/api/articles/3')
        .send({ author: 'rogersop' });
      expect(status).toBe(400);
      expect(msg).toEqual('Bad Request: invalid request body');
    });
    it('404: attempting to update an article that does not exist throws a Not Found error', async () => {
      const {
        status,
        body: { msg },
      } = await request(app)
        .patch('/api/articles/99')
        .send({ addOrRemoveVotes: 1 });
      expect(status).toBe(404);
      expect(msg).toEqual('Not Found');
    });
    it('400: passing an article_id of the wrong type throws a bad request error', async () => {
      const {
        status,
        body: { msg },
      } = await request(app)
        .patch('/api/articles/foo')
        .send({ addOrRemoveVotes: 1 });
      expect(status).toBe(400);
      expect(msg).toEqual('Bad Request');
    });
  });
});
