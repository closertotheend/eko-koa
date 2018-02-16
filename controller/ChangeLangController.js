const User = require("./../model/User");
const { Controller } = require("./../eko-koa");

class ChangeLangController extends Controller {
  async changeLang(ctx) {
    super.changeLang(ctx, ctx.params.language);
    ctx.redirect("/");
  }
}

module.exports = new ChangeLangController();
