/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("Users", table => {
      table.increments("id").notNullable().primary();
      table.string("username").notNullable().unique();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("hash").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("Users");
};
