const { sendTopics } = require('../models/topicsModel');

exports.getTopics = (req, res, next) => {
  sendTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
