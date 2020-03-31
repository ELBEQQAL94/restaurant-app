const Knex = require("knex");
const { user } = require("../../src/contants/tableNames");

exports.up = async knex => {
  await knex.schema.creatTable(user, table => {
    table.increments().notNullable();
    table
      .string("email", 254)
      .notNullable()
      .unique();
    table.string("username").notNullable();
    table.string("password", 500).notNullable();
    table.datetime("last_login");
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable(user);
};
