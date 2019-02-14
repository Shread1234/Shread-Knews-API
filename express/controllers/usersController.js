const { sendUsers } = require('../models/usersModel');

exports.getUsers = (req, res, next) => {
  sendUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
