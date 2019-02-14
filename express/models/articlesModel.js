const connection = require('../../db/connection');

exports.sendArticles = (passedQuery) => {
  const query = {};
  let sort_by = 'articles.created_at';
  let order = 'desc';

  if (passedQuery.author) query['articles.author'] = passedQuery.author;

  if (passedQuery.topic) query['articles.topic'] = passedQuery.topic;

  if (passedQuery.sort_by) sort_by = [`articles.${passedQuery.sort_by}`];

  if (passedQuery.order) order = passedQuery.order;

  return connection
    .select('articles.*')
    .from('articles')
    .where(query)
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order);
};
exports.addArticle = articleToAdd => connection('articles')
  .insert(articleToAdd)
  .returning('*');
