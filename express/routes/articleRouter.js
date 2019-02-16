const articleRouter = require('express').Router();
const {
  getArticles,
  postArticle,
  getArticlesById,
  patchArticleById,
  deleteArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../controllers/articlesController.js');
const { handle405 } = require('../errors');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle)
  .all(handle405);

articleRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleById)
  .delete(deleteArticleById)
  .all(handle405);

articleRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405);

module.exports = articleRouter;
