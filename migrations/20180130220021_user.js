exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("name");
    //mandatory
    table.timestamps();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("users");
};
