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
    // it('DELETE request on topics endpoint returns a status of 405 and a message of Method Not Allowed', () => {
    //   return request
    //     .delete('/api/topics')
    //     .expect(405)
    //     .then((res) => {
    //       expect(res.body.msg).to.equal('Method Not Allowed');
    //     });
    // });
    it('POST into topics will insert a new topic with a slug and description. A success message will be the added topic', () => {
      const insertedTopic = {
        slug: 'gaming',
        description: 'Stuff other than FIFA'
      };
      return request
        .post('/api/topics')
        .send(insertedTopic)
        .expect(201)
        .then((res) => {
          expect(res.body.addedTopic).to.contain.keys(('slug', 'description'));
          return request
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.have.lengthOf(3);
              expect(body.topics[2]).to.have.property('slug', 'gaming');
            });
        });
    });
  });
});
