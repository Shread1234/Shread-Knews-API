const articleRouter = require('express').Router();
const {
  getArticles,
  postArticle,
} = require('../controllers/articlesController.js');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

module.exports = articleRouter;
