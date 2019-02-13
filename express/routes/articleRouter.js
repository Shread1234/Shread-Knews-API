const articleRouter = require('express').Router();
const { getArticles } = require('../controllers/articlesController.js');

articleRouter.route('/').get(getArticles);

module.exports = articleRouter;
