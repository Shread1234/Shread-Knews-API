const ENV = process.env.NODE_ENV || 'development';
const dbconfig =
  ENV === 'production'
    ? {
        client: 'pg',
        connection: process.env.DATABASE_URL
      }
    : require('../knexfile');

module.exports = require('knex')(dbconfig);

// const knex = require('knex');
// const dbconfig = require('../knexfile.js');

// const connection = knex(dbconfig);

// module.exports = connection;
