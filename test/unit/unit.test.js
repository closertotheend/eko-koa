const test = require("ava");

test("foo", async t => {
  t.pass();
});

test("bar", async t => {
  const bar = Promise.resolve("bar");
  t.is(await bar, "bar");
});
