function addDefaultsColumns(table) {
  table.datetime("deleted_at");
  table.timestamps();
}

function references(table, name) {
  table
    .integer(`${name}_id`)
    .unsigned()
    .references("id")
    .inTable(name)
    .onDelete("cascade");
}

function description(table) {
  table.string("description", 1000).notNullable();
}

function image_url(table) {
  table.string("image_url", 2000);
}

function phone(table) {
  table.string("phone", 30);
}

module.exports = {
  addDefaultsColumns,
  references,
  description,
  image_url,
  phone
};
