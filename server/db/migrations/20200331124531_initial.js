const Knex = require("knex");
const {
  user,
  productCategory,
  role,
  productReview,
  product,
  team,
  position,
  order
} = require("../../src/constants/tableNames");

const {
  addDefaultsColumns,
  references,
  description,
  image_url,
  phone
} = require("../helpers");

exports.up = async knex => {
  await Promise.all([
    knex.schema.createTable(productReview, table => {
      table.increments().notNullable();
      description(table);
      references(table, "user");
      references(table, "product");
      addDefaultsColumns(table);
    }),
    knex.schema.createTable(team, table => {
      table.increments().notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("firstname").notNullable();
      table.string("lastname").notNullable();
      phone(table);
      image_url(table);
      table.boolean("active").notNullable();
      references(table, "position");
      addDefaultsColumns(table);
    }),
    knex.schema.createTable(user, table => {
      table.increments().notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("username").notNullable();
      table.string("password", 500).notNullable();
      phone(table);
      image_url(table);
      table.boolean("active").notNullable();
      references(table, "role");
      references(table, "product");
      references(table, "order");
      table.datetime("last_login");
      addDefaultsColumns(table);
    }),
    knex.schema.createTable(productCategory, table => {
      table.increments().notNullable();
      table
        .string("name", 254)
        .notNullable()
        .unique();
      image_url(table);
      description(table);
      addDefaultsColumns(table);
    }),
    knex.schema.createTable(product, table => {
      table.increments().notNullable();
      table.string("name", 254).notNullable();
      table.float("price").notNullable();
      table.string("origin", 254).notNullable();
      table.datetime("open");
      table.datetime("closed");
      description(table);
      table.string("recipe", 1000).notNullable();
      image_url(table);
      references(table, "team");
      references(table, "product_category");
      addDefaultsColumns(table);
    }),
    await knex.schema.createTable(order, table => {
      table.increments().notNullable();
      table.string("trackId", 254).notNullable();
      addDefaultsColumns(table);
    }),
    await knex.schema.createTable(role, table => {
      table.increments().notNullable();
      table.string("name", 10).notNullable();
      addDefaultsColumns(table);
    }),
    await knex.schema.createTable(position, table => {
      table.increments().notNullable();
      table.string("name", 30).notNullable();
      addDefaultsColumns(table);
    })
  ]);
};

exports.down = async knex => {
  await Promise.all(
    [
      productReview,
      user,
      product,
      productCategory,
      role,
      team,
      position,
      order
    ].map(table => knex.schema.dropTable(table))
  );
};
