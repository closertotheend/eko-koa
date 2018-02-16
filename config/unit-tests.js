const debug = false;
const dev = false;

module.exports = {
  koa: {
    keys: ["some secret hurr"],
    port: 3001
  },
  knex: {
    debug: debug,
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: "./localdb.sqlite"
    }
  },
  ejs: {
    layout: "template",
    cache: !dev,
    debug: debug
  }
};
