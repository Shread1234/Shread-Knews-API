process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const connection = require('../db/connection');
const app = require('../express/app');
const endpoints = require('../express/endpoints.json');

const request = supertest(app);

describe('/', () => {
  it("Any request type will return an ERROR with a status code of 404 as this endpoint doesn't exist.", () =>
    request
      .get('/')
      .expect(404)
      .then(({ body }) => {
        expect(body['Error 404']).to.equal('Page Not Found');
      })
      .then(() =>
        request
          .get('/randomrubbish')
          .expect(404)
          .then(({ body }) => {
            expect(body['Error 404']).to.equal('Page Not Found');
          })
          .then(() =>
            request
              .post('/randomrubbish')
              .send({ stuff: 'test' })
              .expect(404)
              .then(({ body }) => {
                expect(body['Error 404']).to.equal('Page Not Found');
              })
          )
          .then(() =>
            request
              .put('/randomrubbish')
              .send({ test: 'test' })
              .expect(404)
              .then(({ body }) => {
                expect(body['Error 404']).to.equal('Page Not Found');
              })
          )
          .then(() =>
            request
              .delete('/randomrubbish')
              .expect(404)
              .then(({ body }) => {
                expect(body['Error 404']).to.equal('Page Not Found');
              })
          )
      ));
});

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it('GET on /api endpoint RETURNS as JSON with all available endpoints.', () =>
    request
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).eql(endpoints);
      }));

  it('Returns an ERROR with a status code of 404 if an unrecognised endpoint is entered after /api', () =>
    request
      .get('/api/randomrubbish')
      .expect(404)
      .then(({ body }) => {
        expect(body['Error 404']).to.equal('Page Not Found');
      }));

  describe('/topics', () => {
    it('Returns an ERROR with a status code of 404 if an unrecognised endpoint is entered after /topics', () =>
      request
        .get('/api/topics/randomrubbish')
        .expect(404)
        .then(({ body }) => {
          expect(body['Error 404']).to.equal('Page Not Found');
        }));
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
          expect(res.body.topic).to.contain.keys(('slug', 'description'));
          return request
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.have.lengthOf(3);
              expect(body.topics[2]).to.have.property('slug', 'gaming');
            });
        });
    });
    it('Returns an ERROR with a status code of 400 if a user inserts a topic with a duplicate SLUG.', () => {
      const insertedTopic = {
        slug: 'mitch',
        description: 'test'
      };
      return request
        .post('/api/topics/')
        .send(insertedTopic)
        .expect(400)
        .then(({ body }) => {
          expect(body['Error 400']).to.equal('Unprocessable Entity');
        });
    });
    it('Returns an ERROR with a status code of 400 if a user inserts a topic without the right keys', () => {
      const insertedTopic = {
        slug: 'new slug'
      };
      return request
        .post('/api/topics/')
        .send(insertedTopic)
        .expect(400)
        .then(({ body }) => {
          expect(body['Error 400']).to.equal('Unprocessable Entity');
        });
    });
    it('Returns an ERROR with a status code of 405 if an invalid request is made by the user.', () =>
      request
        .patch('/api/topics/')
        .expect(405)
        .then(({ body }) => {
          expect(body['Error 405']).to.equal('Method Not Allowed');
        })
        .then(() =>
          request
            .delete('/api/topics')
            .expect(405)
            .then(({ body }) => {
              expect(body['Error 405']).to.equal('Method Not Allowed');
            })
        ));
    describe('/articles', () => {
      it('Returns an ERROR with a status code of 404 if an unrecognised endpoint is entered after /articles', () =>
        request
          .get('/api/articles/randomrubbish')
          .expect(404)
          .then(({ body }) => {
            expect(body['Error 404']).to.equal('Page Not Found');
          }));
      it('Returns an ERROR with a status code of 405 if an unrecognised method is used on /articles', () =>
        request
          .patch('/api/articles')
          .send('something')
          .expect(405)
          .then(({ body }) => {
            expect(body['Error 405']).to.equal('Method Not Allowed');
          })
          .then(() =>
            request
              .delete('/api/articles')
              .expect(405)
              .then(({ body }) => {
                expect(body['Error 405']).to.equal('Method Not Allowed');
              })
          ));
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
            expect(res.body.article).to.contain.keys(
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
      it('GET articles can take a SORT BY query which sorts by any valid column, and defaults to date if no column is queried', () =>
        request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].created_at).to.equal(
              '2018-11-15T12:21:54.171+00:00'
            );
          }));
      it('GET articles can take a SORT BY query which ignores invalid columns', () =>
        request
          .get('/api/articles?sort_by=testcolumn')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].created_at).to.equal(
              '2018-11-15T12:21:54.171+00:00'
            );
          }));
      it('GET articles will SORT BY title if the query is passed defaulting to descending', () =>
        request
          .get('/api/articles?sort_by=title')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].title).to.equal('Z');
          }));
      it('GET articles will SORT BY author alphabetically ascending if the query is passed', () =>
        request
          .get('/api/articles?sort_by=author&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].author).to.equal('butter_bridge');
          }));
    });
    describe('/articles/:article_id', () => {
      it('Returns an ERROR with a status code of 404 if an unrecognised article_id is entered after /articles', () =>
        request
          .get('/api/articles/900')
          .expect(404)
          .then(({ body }) => {
            expect(body['Error 404']).to.equal('Page Not Found');
          })
          .then(() => {
            request
              .get('/api/articles/rubbish')
              .expect(400)
              .then(({ body }) => {
                expect(body['Error 400']).to.equal('unproceeasable Entity');
              });
          }));
    });
    it('GET using the article_id endpoint will return the article that matches the ID passed in the request parameter. It will also include a comment_count key', () =>
      request
        .get('/api/articles/6')
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).to.equal(6);
          expect(body.article).to.contain.keys(
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
    it('PATCH using the article_id endpoint will deal with a vote request to add votes', () =>
      request
        .patch('/api/articles/6')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(1);
        }));
    it('PATCH using the article_id endpoint will deal with a vote request to subtract votes', () =>
      request
        .patch('/api/articles/6')
        .send({ inc_votes: -100 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(-100);
        }));
    it('DELETE using the article_id endpoint will remove the article that matches the ID passed in the request parameter', () =>
      request
        .delete('/api/articles/6')
        .expect(204)
        .then(() =>
          request
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              const search = body.articles.some(
                (article) => article.article_id === 6
              );
              expect(search).to.equal(false);
            })
        ));
  });
  describe('/articles/:article_id/comments', () => {
    it('GET on article_id/comments returns all the comments attached to that article with all excluding the article_id', () =>
      request
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.lengthOf(2);
          expect(body.comments[0]).to.contain.keys(
            'comment_id',
            'votes',
            'created_at',
            'author',
            'body'
          );
        }));
    it('GET on article_id/comments can take a query as a filter to only show comments from the columun passed in the request query.', () =>
      request
        .get('/api/articles/1/comments?author=icellusedkars')
        .expect(200)
        .then(({ body }) => {
          const search = body.comments.every(
            (comment) => comment.author === 'icellusedkars'
          );
          expect(search).to.equal(true);
          expect(body.comments).to.have.lengthOf(11);
        }));
    it('GET on article_id/comments can take a SORT BY query which sorts by any valid column, and defaults to date if no column is queried', () =>
      request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].created_at).to.equal(
            '2016-11-22T12:36:03.389+00:00'
          );
        }));
    it('GET on article_id/comments will SORT BY author if the query is passed defaulting to descending', () =>
      request
        .get('/api/articles/1/comments?sort_by=author')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].author).to.equal('icellusedkars');
        }));
    it('GET on article_id/comments will SORT BY author alphabetically ascending if the query is passed', () =>
      request
        .get('/api/articles/1/comments?sortBy=author&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].author).to.equal('butter_bridge');
        }));
    it('POST into article_id/comments will insert a new comment with keys of comment_id, author, article_id, votes, created_at and body. A success message will be the added comment.', () => {
      const insertedComment = {
        username: 'butter_bridge',
        body: 'My username is super original!'
      };
      return request
        .post('/api/articles/5/comments')
        .send(insertedComment)
        .expect(201)
        .then((res) => {
          expect(res.body.comment).to.contain.keys(
            ('comment_id',
            'author',
            'article_id',
            'votes',
            'body',
            'created_at')
          );
        })
        .then(() =>
          request
            .get('/api/articles/5/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.have.lengthOf(3);
            })
        );
    });
  });
  describe('/comments/:comment_id', () => {
    it('PATCH using the comment_id endpoint will deal with a vote request to add a vote', () =>
      request
        .patch('/api/comments/1')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(17);
        }));
    it('PATCH using the comment_id endpoint will deal with a vote request to subtract a vote', () =>
      request
        .patch('/api/comments/1')
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(15);
        }));
    it('DELETE using the comment_id endpoint will remove the comment that matches the ID passed in the request parameter', () =>
      request
        .delete('/api/comments/1')
        .expect(204)
        .then(() =>
          request
            .get('/api/articles/9/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.have.lengthOf(1);
            })
        ));
  });
  describe('/users', () => {
    it('GET request on users endpoint will return all users with the keys of username, avatar_url and name', () =>
      request
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.users).to.be.an('array');
          expect(body.users[0]).to.contain.keys(
            'username',
            'avatar_url',
            'name'
          );
        }));
    it('POST into users will insert a new user with keys of username, avatar_url and name. A success message will be the added user.', () => {
      const insertedUser = {
        username: 'shread1234',
        avatar_url: 'www.somewebsite.com?userpic=shread1234',
        name: 'Jamie'
      };
      return request
        .post('/api/users')
        .send(insertedUser)
        .expect(201)
        .then((res) => {
          expect(res.body.user).to.contain.keys(
            ('username', 'avatar_url', 'name')
          );
          return request
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
              expect(body.users).to.have.lengthOf(4);
            });
        });
    });
    it('GET using the username endpoint will return the user that matches the username passed in the request parameter.', () =>
      request
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({ body }) => {
          expect(body.user.username).to.equal('butter_bridge');
          expect(body.user).to.contain.keys('username', 'avatar_url', 'name');
        }));
  });
});
