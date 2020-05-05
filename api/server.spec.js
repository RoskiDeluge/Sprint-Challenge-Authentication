const request = require('supertest');
const server = require('./server.js');

describe('server.js', function() {
  describe('POST /api/auth/register', function() {
    it('should return 201 Created', function() {
      const user = {
        username: "user3",
        password: "12345"
      }
      return request(server)
        .post('/api/auth/register')
        .send(user)
        .set('Accept', 'application/json')
        .then(response => {
          expect(response.status).toBe(201);
        })
    });
  } )

  let token;

  beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send({ username: 'Maria', password: '12345' })
      .end((err, response) => {
        token = response.body.token;
        done();
      })
  })

  describe('POST api/auth/login', function() {
    it('should return 200', function() {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'Maria', password: '12345' })
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
    it('should return JSON', function() {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'Maria', password: '12345' })
        .then(response => {
          expect(response.type).toMatch(/json/i);
        })
    })
  })

  describe('GET /jokes', function() {
    it('should require authorization', function() {
      return request(server)
        .get("/api/jokes")
        .then(response => {
          expect(response.status).toBe(401);
        })
    })
    it('should return status 200 OK with auth', function() {
      return request(server)
        .get("/api/jokes")
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          expect(response.status).toBe(200);
        })
    });
    it('should return JSON with auth', function() {
      return request(server)
        .get("/api/jokes")
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          expect(response.type).toMatch(/json/i);
        })
    });
  } )
} )