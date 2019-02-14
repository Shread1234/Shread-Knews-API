process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const connection = require('../db/connection');
const app = require('../express/app');

const request = supertest(app);

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET topics gives an array of all topics with their slugs and descriptions', () =>
      request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array');
        }));
    it('GET topics gives an array with keys of slug and description', () =>
      request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        }));
    it('POST into topics will insert a new topic with a slug and description. A success message will be the added topic.', () => {
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
  describe('/articles', () => {
    it('GET articles returns an array of all articles and the keys of author, title, article_id, topic, created_at, votes, body and comment_count', () =>
      request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'body',
            'comment_count'
          );
        }));
    it('POST into articles will insert a new article keys of title, body, topic and username. A success message will be the added article.', () => {
      const insertedArticle = {
        title: 'Only for the 1337',
        body: "If you don't play PUBG, then you're a dirty scrub",
        topic: 'cats',
        username: 'butter_bridge'
      };
      return request
        .post('/api/articles')
        .send(insertedArticle)
        .expect(201)
        .then((res) => {
          expect(res.body.addedArticle).to.contain.keys(
            ('article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at')
          );
        });
    });
    it('GET articles can take an author query as a filter to only show articles from the author passed in.', () =>
      request
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then(({ body }) => {
          const search = body.articles.every(
            (article) => article.author === 'butter_bridge'
          );
          expect(search).to.equal(true);
        }));
    it('GET articles can take a topic query as a filter to only show topics from the topic passed in.', () =>
      request
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body }) => {
          const search = body.articles.every(
            (article) => article.topic === 'mitch'
          );
          expect(search).to.equal(true);
        }));
    it('GET articles can take a chained query of topic and author as a filter to only show articles from the topic and author passed in.', () =>
      request
        .get('/api/articles?topic=mitch&author=icellusedkars')
        .expect(200)
        .then(({ body }) => {
          const searchTopic = body.articles.every(
            (article) => article.topic === 'mitch'
          );
          expect(searchTopic).to.equal(true);

          const searchAuthor = body.articles.every(
            (article) => article.author === 'icellusedkars'
          );

          expect(searchAuthor).to.equal(true);
        }));
  });
});
