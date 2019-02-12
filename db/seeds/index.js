const {
  articleData,
  topicData,
  userData,
  commentData
} = require('../data/index');

// const {} = require('../utility/index');

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
      console.log(articleData);
    });
};
