const articleRouter = require('express').Router();
const {
  getArticles,
  postArticle,
  getArticlesById,
  patchArticleById,
  deleteArticleById,
} = require('../controllers/articlesController.js');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articleRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

module.exports = articleRouter;
