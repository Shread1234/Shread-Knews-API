const {
  articleData,
  topicData,
  userData,
  commentData
} = require('../data/index');

const { formatArticleData, formatComments } = require('../utility/index');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      Promise.all([
        knex('topics')
          .insert(topicData)
          .returning('*'),
        knex('users')
          .insert(userData)
          .returning('*')
      ])
    )
    .then(([topicsData, usersData]) => {
      const articleTime = formatArticleData(articleData);
      return knex('articles')
        .insert(articleTime)
        .returning('*');
    })
    .then((articles) => {
      // need article ID
      console.log(articles);
      //   const commentsFormat = formatComments(commentData);
      //   return knex('comments')
      //     .insert(commentsFormat)
      //     .returning('*');
      // });
    });
};
