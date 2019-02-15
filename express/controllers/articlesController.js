const {
  sendArticles,
  addArticle,
  sendArticleById,
  updateArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId,
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
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const newVote = req.body;
  const id = req.params;
  updateArticleById(id, newVote)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const id = req.params;
  removeArticleById(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const id = req.params;
  const query = req.query;
  sendCommentsByArticleId(id, query)
    .then((comments) => {
      res.status(200).send({ comments });
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
