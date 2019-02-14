const connection = require('../../db/connection');

exports.sendUsers = () => connection
  .select('*')
  .from('users')
  .returning('*');

exports.addUser = userToAdd => connection('users')
  .insert(userToAdd)
  .returning('*');
