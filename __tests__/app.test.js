const endpointsJson = require('../endpoints.json');
const request = require('supertest');
const app = require('../app/app');
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

describe('GET /api', () => {
  test('200: Responds with an object detailing the documentation for each endpoint', async () => {
    const { status, body } = await request(app).get('/api');
    expect(status).toBe(200);
    expect(body.endpoints).toEqual(endpointsJson);
  });
});
