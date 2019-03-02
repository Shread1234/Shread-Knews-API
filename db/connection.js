const ENV = process.env.NODE_ENV || 'development';
const config = ENV === 'production' && {
  client: 'pg',
  connection: process.env.DATABASE_URL
};

module.exports = require('knex')(config);

// const knex = require('knex');
// const dbconfig = require('../knexfile.js');

// const connection = knex(dbconfig);

// module.exports = connection;
