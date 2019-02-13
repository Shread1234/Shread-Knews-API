const connection = require('../../db/connection');

exports.sendTopics = () => connection.select('*').from('topics');

exports.addTopic = topicToAdd => connection('topics')
  .insert(topicToAdd)
  .returning('*');
