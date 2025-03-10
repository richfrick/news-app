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

describe('Topics Endpoint', () => {
  describe('GET: /api/topics', () => {
    it('200: all topics are returned whent the /api/topics enpoint is hit', async () => {
      const {
        status,
        body: { topics },
      } = await request(app).get('/api/topics');
      expect(status).toBe(200);
      expect(topics.length).toBe(3);
    });
    it('200: api response will contain slug, description & img_url', async () => {
      const {
        status,
        body: { topics },
      } = await request(app).get('/api/topics');
      expect(status).toBe(200);
      topics.forEach((topic) => {
        expect(topic).toEqual({
          slug: expect.any(String),
          description: expect.any(String),
          img_url: expect.any(String || null),
        });
      });
    });
  });
});
