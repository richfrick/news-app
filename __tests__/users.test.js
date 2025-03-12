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

describe('Users Endpoint', () => {
  describe('GET: /api/users', () => {
    it('200: returns a list of all users in the db', async () => {
      const {
        status,
        body: { users },
      } = await request(app).get('/api/users');
      expect(status).toBe(200);
      expect(users.length).toBe(4);
    });
    it('200: each object in the response will contain  username, name, avatar_url', async () => {
      const {
        status,
        body: { users },
      } = await request(app).get('/api/users');
      expect(status).toBe(200);
      users.forEach((user) => {
        expect(user).toEqual({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
    });
  });
});
