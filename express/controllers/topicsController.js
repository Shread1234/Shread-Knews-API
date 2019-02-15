const { sendTopics, addTopic } = require('../models/topicsModel');

exports.getTopics = (req, res, next) => {
  sendTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  const topicToAdd = req.body;
  addTopic(topicToAdd)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
