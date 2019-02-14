exports.up = function (knex, Promise) {
  const now = new Date(Date.now());
  return knex.schema.createTable('comments', (comments) => {
    comments.increments('comment_id').primary();
    comments
      .string('author')
      .references('users.username')
      .notNullable();
    comments
      .integer('article_id')
      .references('articles.article_id')
      .notNullable();
    comments.integer('votes').defaultTo(0);
    comments.string('created_at').defaultTo(now.toUTCString());
    comments.string('body', 10485760).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
