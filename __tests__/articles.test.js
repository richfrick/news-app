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
    describe('GET: /api/articles/:article_id', () => {
        it.todo('200: an individual article can be retrieved by id')
        it.todo('200: article object will contain author, title, article_id, body, topic, created_at, votes, article_img_url')
        it.todo('400: bad request should be returned when an non integer is used for article_id')
        it.todo('404: not found will be returned if the article_id does not exist')
    })
})