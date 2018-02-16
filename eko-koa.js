const Koa = require("koa");
const render = require("koa-ejs");
const logger = require("koa-logger");
const Router = require("koa-router");
const etag = require("koa-etag");
const conditional = require("koa-conditional-get");
const helmet = require("koa-helmet");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const flash = require("koa-flash-simple");
const locale = require("koa-locale");
const i18n = require("koa-i18n");

const path = require("path");
const cron = require("cron");
const Youch = require("youch");
const PrettyError = require("pretty-error");
PrettyError.start();

const objection = require("objection");
const knexDependency = require("knex");

const router = new Router();
const pe = new PrettyError();
const app = new Koa();

let config;
const isDevelop =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
if (isDevelop) {
  config = require(`./config/development`);
} else {
  config = require(`./config/${process.env.NODE_ENV}`);
}

app.keys = config.koa.keys;

const renderConfig = Object.assign(
  {},
  {
    root: path.join(__dirname, "view"),
    layout: "template",
    viewExt: "ejs",
    cache: !isDevelop,
    debug: false
  },
  config.ejs
);

const sessionConfig = Object.assign(
  {},
  {
    key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
    maxAge: 86400000,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  },
  config.session
);

const i18nConfig = Object.assign(
  {},
  {
    directory: "./locales",
    extension: ".json",
    locales: ["en", "ru"], //  `zh-CN` defualtLocale, must match the locales to the filenames
    modes: [
      "query", //  optional detect querystring - `/?locale=en-US`
      "subdomain", //  optional detect subdomain   - `zh-CN.koajs.com`
      "cookie", //  optional detect cookie      - `Cookie: locale=zh-TW`
      "header", //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
      "url", //  optional detect url         - `/en`
      "tld" //  optional detect tld(the last domain) - `koajs.       //  optional custom function (will be bound to the koa context)
    ]
  },
  config.i18n
);

const knex = knexDependency(
  Object.assign(
    {},
    {
      client: "sqlite3",
      debug: true,
      connection: {
        filename: "./mydb.sqlite"
      }
    },
    config.knex
  )
);

const globalSessionHandler = async (ctx, next) => {
  if (ctx.path === "/favicon.ico") return;
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  await next();
};

const errorPageHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    console.log(pe.render(err));
    if (isDevelop) {
      ctx.body = await new Youch(err, ctx.request).toHTML();
    }
  }
};

const notFoundPageHandler = async (ctx, next) => {
  if (ctx.status == 404) {
    await _renderWithHelpers(ctx, "404", { user: "Not found" });
  }
};

_renderWithHelpers = (ctx, view, data) => {
  return ctx.render(
    view,
    Object.assign(
      {},
      {
        flash: ctx.flash.get(),
        __: (...arg) => ctx.i18n.__(arg),
        currentLang: ctx.cookies.get("locale")
      },
      data
    )
  );
};

class Model extends objection.Model {
  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

class Controller {
  async render(ctx, view, data) {
    return await _renderWithHelpers(ctx, view, data);
  }

  changeLang(ctx, lang) {
    ctx.cookies.set("locale", ctx.params.language);
  }

  async json(ctx, data) {
    ctx.body = data;
  }
}

objection.Model.knex(knex);
locale(app);
render(app, renderConfig);

app
  .use(logger())
  .use(helmet())
  .use(conditional())
  .use(compress())
  .use(etag())
  .use(bodyParser())
  .use(session(sessionConfig, app))
  .use(i18n(app, i18nConfig))
  .use(globalSessionHandler)
  .use(flash())
  .use(errorPageHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(require("koa-static")(__dirname + "/public"))
  .use(notFoundPageHandler);

const port = config.koa.port || 3000;
app.listen(port);
console.log("Listening on port " + port);

require("./jobs/cronjobs");

module.exports = {
  app,
  router,
  knex,
  objection,
  cron,
  CronJob: cron.CronJob,
  Model,
  Controller
};
