const debug = false;
const dev = true;

module.exports = {
  koa: {
    keys: ["some secret hurr"],
    port: 3000
  },
  knex: {
    debug: debug,
    useNullAsDefault: true,
    client: "sqlite",
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
