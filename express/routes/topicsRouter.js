const topicsRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topicsController.js');
// const { handle405 } = require('../errors/index.js');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopic);

module.exports = topicsRouter;
