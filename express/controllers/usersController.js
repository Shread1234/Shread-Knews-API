const { sendUsers, addUser } = require('../models/usersModel');

exports.getUsers = (req, res, next) => {
  sendUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((addedUser) => {
      res.status(201).send({ addedUser });
    })
    .catch(next);
};
