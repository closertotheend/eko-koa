const test = require("ava");
const { app } = require("../../eko-koa");
const superkoa = require("superkoa");
const koaMock = superkoa(app);

test("call index of servers", async t => {
  let res = await koaMock.get("/");
  t.is(200, res.status);
  t.true(res.text.includes("<head"));
});
