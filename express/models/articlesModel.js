const connection = require('../../db/connection');

exports.sendArticles = (query) => {
  const empty = {};
  if (query.author) empty['articles.author'] = query.author;
  empty;
  return connection
    .select('articles.*')
    .from('articles')
    .where(empty)
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('articles.article_id');
};
exports.addArticle = (articleToAdd) =>
  connection('articles')
    .insert(articleToAdd)
    .returning('*');
