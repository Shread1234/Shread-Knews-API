const connection = require('../../db/connection');

exports.sendArticles = (req = {}) => connection
  .select(
    'articles.author',
    'title',
    'articles.article_id',
    'topic',
    'articles.created_at',
    'articles.votes',
    'articles.body',
  )
  .from('articles')
  .where('articles.author', '=', req.author)
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .count('comments.article_id AS comment_count')
  .groupBy(
    'articles.author',
    'title',
    'articles.article_id',
    'topic',
    'articles.created_at',
    'articles.votes',
    'articles.body',
  );

exports.addArticle = articleToAdd => connection('articles')
  .insert(articleToAdd)
  .returning('*');
