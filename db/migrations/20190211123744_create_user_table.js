exports.up = function (knex) {
  return knex.schema.createTable('users', (users) => {
    users
      .string('username')
      .notNullable()
      .unique()
      .primary();
    users.string('avatar_url');
    users.string('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
