const commentsRouter = require('express').Router();
const {
  patchCommentById,
  deleteCommentById,
} = require('../controllers/commentsController.js');
const { handle405 } = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = commentsRouter;
