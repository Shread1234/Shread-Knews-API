exports.up = function (knex) {
  return knex.schema.createTable('comments', (comments) => {
    comments.increments('comment_id').primary();
    comments
      .string('author')
      .references('users.username')
      .notNullable();
    comments
      .integer('article_id')
      .references('articles.article_id')
      .notNullable()
      .onDelete('CASCADE');
    comments.integer('votes').defaultTo(0);
    comments.string('created_at').defaultTo(knex.fn.now());
    comments.string('body', 10485760).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
