const connection = require('../../db/connection');

exports.sendTopics = () => {
  return connection.select('*').from('topics');
};

exports.addTopic = (topicToAdd) => {
  return connection('topics')
    .insert(topicToAdd)
    .returning('*');
};
