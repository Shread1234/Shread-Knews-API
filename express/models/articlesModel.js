const connection = require('../../db/connection');

exports.sendArticles = (passedQuery) => {
  const query = {};
  let sort_by = 'articles.created_at';
  let order = 'desc';

  if (passedQuery.author) query['articles.author'] = passedQuery.author;

  if (passedQuery.topic) query['articles.topic'] = passedQuery.topic;

  if (passedQuery.sort_by) sort_by = `articles.${passedQuery.sort_by}`;

  if (passedQuery.order) order = passedQuery.order;

  const articleLookup = [
    'articles.article_id',
    'articles.title',
    'articles.body',
    'articles.votes',
    'articles.topic',
    'articles.author'
  ];

  if (articleLookup.includes(sort_by) === false)
    sort_by = 'articles.created_at';

  return connection
    .select('articles.*')
    .from('articles')
    .where(query)
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .returning('*');
};
exports.addArticle = (articleToAdd) =>
  connection('articles')
    .insert(articleToAdd)
    .returning('*');

exports.sendArticleById = (id) => {
  const searchId = id.article_id;
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', '=', searchId)
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('comments.article_id', 'articles.article_id')
    .returning('*');
};

exports.updateArticleById = (id, newVote) => {
  const searchId = id.article_id;
  const voteUpdate = newVote.inc_votes;

  return connection('articles')
    .where('articles.article_id', '=', searchId)
    .increment('votes', voteUpdate)
    .returning('*');
};

exports.removeArticleById = (id) => {
  const searchId = id.article_id;
  return connection('articles')
    .where('articles.article_id', '=', searchId)
    .delete();
};

exports.sendCommentsByArticleId = (id, passedQuery) => {
  const query = {};
  const searchId = id.article_id;
  let order = 'desc';
  let sort_by = 'comments.created_at';

  if (passedQuery.order) order = passedQuery.order;

  if (passedQuery.sort_by) sort_by = [`comments.${passedQuery.sort_by}`];

  if (passedQuery.author) query['comments.author'] = passedQuery.author;

  return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('comments.article_id', '=', searchId)
    .orderBy(sort_by, order)
    .where(query)
    .returning('*');
};

exports.addCommentByArticleId = (id, commentToAdd) => {
  const article_id = id.article_id;
  const { author, body } = commentToAdd;

  return connection('comments')
    .insert({ article_id, author, body })
    .returning('*');
};
