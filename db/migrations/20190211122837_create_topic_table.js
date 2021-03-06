exports.up = function (knex) {
  return knex.schema.createTable('topics', (topics) => {
    topics
      .string('slug')
      .notNullable()
      .unique()
      .primary();
    topics.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('topics');
};
