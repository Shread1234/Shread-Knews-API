exports.up = function(knex, Promise) {
  const now = new Date(Date.now());
  return knex.schema.createTable('articles', (articles) => {
    articles.increments('article_id').primary();
    articles.string('title').notNullable();
    articles.string('body', 10485760).notNullable();
    articles.integer('votes').defaultTo(0);
    articles
      .string('topic')
      .references('topics.slug')
      .notNullable();
    articles
      .string('author')
      .references('users.username')
      .notNullable();
    articles.string('created_at').defaultTo(now.toUTCString());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
