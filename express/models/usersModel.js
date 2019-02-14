const connection = require('../../db/connection');

exports.sendUsers = () => connection
  .select('*')
  .from('users')
  .returning('*');

exports.addUser = userToAdd => connection('users')
  .insert(userToAdd)
  .returning('*');

exports.sendUserById = (userToFind) => {
  const searchId = userToFind.username;
  return connection
    .select('*')
    .from('users')
    .where('users.username', '=', searchId)
    .returning('*');
};
