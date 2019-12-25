const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  seeds: {
    directory: './db/seeds',
  },
  migrations: {
    directory: './db/migrations',
  },
};

const dbConfig = {
  test: {
    connection: {
      database: 'fake_news',
      user: 'jamiemain',
      password: 'password',
    },
  },
  development: {
    connection: {
      database: 'news',
      user: 'jamiemain',
      password: 'password',
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
