const topicsRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topicsController.js');
const { handle405 } = require('../errors/index');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopic)
  .all(handle405);

module.exports = topicsRouter;
