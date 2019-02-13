const {
  articleData,
  topicData,
  userData,
  commentData,
} = require('../data/index');

const {
  userFormatter,
  topicFormatter,
  formatArticleData,
  formatComments,
} = require('../utility/index');

exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => Promise.all([
    knex('topics')
      .insert(topicFormatter(topicData))
      .returning('*'),
    knex('users')
      .insert(userFormatter(userData))
      .returning('*'),
  ]))
  .then(([topicsData, usersData]) => {
    const insertArticles = knex('articles')
      .insert(formatArticleData(articleData, topicsData, usersData))
      .returning('*');
    return Promise.all([insertArticles, topicsData, usersData]);
  })
  .then(([insertArticles, topicsData, usersData]) => {
    const insertedComments = knex('comments')
      .insert(formatComments(commentData, insertArticles, usersData))
      .returning('*');
    return Promise.all([
      insertedComments,
      insertArticles,
      topicsData,
      usersData,
    ]);
  });
