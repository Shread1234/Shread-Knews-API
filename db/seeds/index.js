const {
  articleData,
  topicData,
  userData,
  commentData
} = require("../data/index");

const { formatTopicData } = require("../utility/index");

exports.seed = (connection, Promise) => {
  return connection("topics")
    .insert(topicData)
    .returning("*")
    .then(insertedTopicData => {});
};
