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

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articleRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

articleRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articleRouter;
