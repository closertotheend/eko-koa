const { router } = require("./eko-koa");
const IndexController = require("./controller/IndexController");
const ChangeLangController = require("./controller/ChangeLangController");

router.get("/", ctx => IndexController.index(ctx));
router.post("/user", ctx => IndexController.insert(ctx));
router.get("/user", ctx => IndexController.show(ctx));
router.get("/usersJson", ctx => IndexController.json(ctx));

router.get("/changeLang/:language", ctx =>
  ChangeLangController.changeLang(ctx)
);
