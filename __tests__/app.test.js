const endpointsJson = require('../endpoints.json');
const request = require('supertest');
const app = require('../app/app');
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

describe('GET /api', () => {
  it('200: Responds with an object detailing the documentation for each endpoint', async () => {
    const {
      status,
      body: { endpoints },
    } = await request(app).get('/api');
    expect(status).toBe(200);
    expect(endpoints).toEqual(endpointsJson);
  });
  it('404: route not found message will be displayed if incorrect route is provided', async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get('/api/foo');
    expect(status).toBe(404);
    expect(msg).toBe('route not found');
  });
  it('200: api/healthz responds with ok message', async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get('/api/healthz');
    expect(status).toBe(200);
    expect(msg).toBe('all good');
  });
});
