const {
  sendArticles,
  addArticle,
  sendArticleById,
  updateArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId
} = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  sendArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const { username, ...articleStuff } = req.body;
  const articleToAdd = { author: username, ...articleStuff };
  addArticle(articleToAdd)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const id = req.params;
  sendArticleById(id)
    .then(([article]) => {
      if (article === undefined) {
        const err = { status: 404 };
        next(err);
      } else res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const newVote = req.body;
  const id = req.params;
  if (typeof newVote.inc_votes !== 'number') {
    const err = { status: 400, msg: 'Your Vote Must Be A Number' };
    next(err);
  } else {
    updateArticleById(id, newVote)
      .then(([article]) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
};

exports.deleteArticleById = (req, res, next) => {
  const id = req.params;
  removeArticleById(id)
    .then((body) => {
      if (body.length === 0) {
        const err = { status: 404, msg: 'Invalid Article ID' };
        next(err);
      }
      res.status(204).send();
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const id = req.params;
  const query = req.query;
  sendCommentsByArticleId(id, query)
    .then((comments) => {
      if (comments.length === 0) {
        const err = { status: 404, msg: 'No Comments Found' };
        next(err);
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  const commentToAdd = { author: username, body };
  const id = req.params;
  addCommentByArticleId(id, commentToAdd)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
