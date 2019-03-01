const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apirouter');

const { handle400s, handle405, handle500 } = require('./errors');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({
    'Error 404': 'Page Not Found',
  });
});

app.use(handle400s);
app.use(handle405);
app.use(handle500);

module.exports = app;
