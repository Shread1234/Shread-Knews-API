const express = require('express');
const app = express();
const apiRouter = require('./routes/apirouter');

app.use('/api', apiRouter);

module.exports = app;
