const request = require('supertest');

const server = require('./server.js');

describe('server.js', function() {
  describe('POST /auth/register', function() {
    it('should return 200 OK', async function() {
      const response = await request(server)
      .post('/auth/register')
      .send({ username: 'Roberto', password: 12345 })
      .set('Accept', 'application/json');
     expect(response.status).toBe(201);
    });
    it.todo('should return JSON');
  } )
  describe('GET /jokes', function() {
    it.todo('should return 200 OK');
    it.todo('should return JSON');
  } )
} )


