const usersRouter = require('express').Router();
const { getUsers, postUser } = require('../controllers/usersController.js');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser);

module.exports = usersRouter;
