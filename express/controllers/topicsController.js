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
    .then(([addedTopic]) => {
      res.status(201).send({ addedTopic });
    })
    .catch(next);
};
