const { sendArticles, addArticle } = require('../models/articlesModel');

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
    .then(([addedArticle]) => {
      res.status(201).send({ addedArticle });
    })
    .catch(next);
};
