const usersRouter = require('express').Router();
const {
  getUsers,
  postUser,
  getUserById,
} = require('../controllers/usersController.js');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser);

usersRouter.route('/:username').get(getUserById);

module.exports = usersRouter;
