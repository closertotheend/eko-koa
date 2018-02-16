const debug = false;
const dev = false;

module.exports = {
  koa: {
    keys: ["some secret hurr"],
    port: 3000
  },
  knex: {
    debug: debug,
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  ejs: {
    layout: "template",
    cache: !dev,
    debug: debug
  }
};
