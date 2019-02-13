const express = require('express');
const app = express();
const apiRouter = require('./routes/apirouter');
const bodyParser = require('body-parser');
// const { handle405 } = require('./errors/index');
app.use(bodyParser.json());

app.use('/api', apiRouter);

// app.use(handle405);

module.exports = app;
