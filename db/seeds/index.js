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
      console.log(usersData);
      const articleTime = formatArticleData(articleData);
      return knex('articles')
        .insert(articleData)
        .returning('*');
    })
    .then((articles) => {
      const commentsFormat = formatComments(commentData, articles);

      console.log(commentsFormat);
      //   return knex('comments')
      //     .insert(commentsFormat)
      //     .returning('*');
      // });
    });
};
