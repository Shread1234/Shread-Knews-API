exports.handle405 = (err, req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle404 = (err, req, res, next) => {
  // console.log(err);
  if (err.code === '22P02' || err.status === 404) {
    res.status(404).send({
      'Error 404': 'Page Not Found',
    });
  } else next(err);
};
