const { sendUsers, addUser, sendUserById } = require('../models/usersModel');

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

exports.getUserById = (req, res, next) => {
  const userToFind = req.params;
  sendUserById(userToFind)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
