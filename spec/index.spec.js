process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../express/app');
const request = supertest(app);
const { expect } = require('chai');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET topics gives an array of all topics with their slugs and descriptions', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array');
        });
    });
    it('GET topics gives an array with keys of slug and description', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
});
