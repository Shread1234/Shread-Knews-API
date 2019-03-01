exports.handle400s = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({
      'Error 404': 'Page Not Found',
    });
  }
  if (err.code === '23505') {
    res.status(422).send({ 'Error 422': 'Unprocessable Entity' });
  }
  if (err.code === '23502' || err.code === '22P02' || err.status === 400) {
    res.status(400).send({ 'Error 400': 'Bad Request' });
  } else next(err);
};

exports.handle405 = (req, res) => {
  res.status(405).send({ 'Error 405': 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({
    'Error 500': 'Internal Server Error',
  });
};
