const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articleRouter = require('./articleRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
