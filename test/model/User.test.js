const test = require("ava");
const { knex } = require("../../eko-koa");
const User = require("../../model/User");

test.before(async t => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test.after(async t => {
  await knex.migrate.rollback();
});

test("test inserting", async t => {
  t.is((await User.query()).length, 3);
  await User.query().insert({ name: "Micky" });
  t.is((await User.query()).length, 4);
});
