exports.handle405 = (err, req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};
