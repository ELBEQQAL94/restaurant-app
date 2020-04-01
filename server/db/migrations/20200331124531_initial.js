const Knex = require("knex");
const { user, productCategory, role } = require("../../src/constants/tableNames");

function addDefaultsColumns(table) {
  table.datetime('deleted_at');
  table.timestamps();
};

function references(table, name) {
  table.integer(`${name}_id`).unsigned().references("id").inTable(name).onDelete("cascade");
}

exports.up = async knex => {
  await Promise.all([
    knex.schema.createTable(user, table => {
      table.increments().notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("username").notNullable();
      table.string("password", 500).notNullable();
      table.string("image_url", 2000);
      table.boolean("active").notNullable();
      references(table, "role");
      table.datetime("last_login");
      addDefaultsColumns(table);
    }),
    knex.schema.createTable(productCategory, (table => {
      table.increments().notNullable();
      table.string("name", 254).notNullable().unique();
      table.float("price").notNullable();
      table.string("origin", 254).notNullable();
      table.datetime("open");
      table.datetime("closed");
      table.string("description", 1000).notNullable();
      addDefaultsColumns(table);
      table.string("image_url", 2000);
    })),
    await knex.schema.createTable(role, table => {
      table.increments().notNullable();
      table.string("name", 10).notNullable();
    })
  ])

};

exports.down = async knex => {
  await Promise.all([
    user,
    productCategory,
    role
  ].map(table => knex.schema.dropTable(table)));
};
