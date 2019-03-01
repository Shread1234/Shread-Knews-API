const usersRouter = require('express').Router();
const {
  getUsers,
  postUser,
  getUserById,
} = require('../controllers/usersController.js');
const { handle405 } = require('../errors/index');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all(handle405);

usersRouter.route('/:username').get(getUserById);

module.exports = usersRouter;
