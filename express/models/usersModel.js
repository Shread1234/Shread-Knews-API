const connection = require('../../db/connection');

exports.sendUsers = () => connection
  .select('*')
  .from('users')
  .returning('*');
