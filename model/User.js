const { Model } = require("./../eko-koa");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = User;
