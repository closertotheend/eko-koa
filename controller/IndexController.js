const User = require("./../model/User");
const { Controller } = require("./../eko-koa");

class IndexController extends Controller {
  async index(ctx) {
    await this.show(ctx);
  }

  async insert(ctx) {
    await User.query().insert(ctx.request.body);
    ctx.flash.set("Successfully added user with name " + ctx.request.body.name);
    ctx.redirect("/");
  }

  async show(ctx) {
    await this.render(ctx, "index", {
      helloTranslation: ctx.i18n.__("hello"),
      users: await User.query(),
      numberOfViews: ctx.session.views
    });
  }

  async json(ctx) {
    super.json(ctx, await User.query());
  }
}

module.exports = new IndexController();
