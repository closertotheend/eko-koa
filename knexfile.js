// Update with your config settings.

module.exports = {
  development: require("./config/development").knex,
  testing: require("./config/testing").knex,
  production: require("./config/production").knex
};
