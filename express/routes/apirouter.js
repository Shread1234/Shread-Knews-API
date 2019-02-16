const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articleRouter = require('./articleRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');
const { getEndPoints } = require('../controllers/endPoints');
const { handle405 } = require('../errors');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.get('/', getEndPoints);
apiRouter.all(handle405);

module.exports = apiRouter;
