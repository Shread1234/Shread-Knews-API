const connection = require('../../db/connection');

exports.sendArticles = () => {
  return connection
    .select(
      'articles.author',
      'title',
      'articles.article_id',
      'topic',
      'articles.created_at',
      'articles.votes',
      'articles.body'
    )
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy(
      'articles.author',
      'title',
      'articles.article_id',
      'topic',
      'articles.created_at',
      'articles.votes',
      'articles.body'
    );
};

//count comment.article_id that match each article
