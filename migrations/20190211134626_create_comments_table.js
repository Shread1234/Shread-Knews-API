exports.up = function(knex, Promise) {
  const now = new Date(Date.now());
  return knex.schema.createTable("comments", comments => {
    comments.increments("comment_id").primary();
    comments.string("author").references("users.username");
    comments.integer("article_id").references("articles.articles_id");
    comments.integer("votes").defaultTo(0);
    comments.string("created_at").defaultTo(now.toUTCString());
    comments.string("body");
  });
};

exports.down = function(knex, Promise) {};
