const { sendArticles } = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  sendArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
