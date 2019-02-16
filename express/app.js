const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apirouter');

const { handle400s, handle405 } = require('./errors');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  next({ status: 404 });
});

app.use(handle400s);

module.exports = app;
