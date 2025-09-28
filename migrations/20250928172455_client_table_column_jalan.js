/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Clients', table =>{
      table.string('jalan').nullable();
      table.string('rt').nullable();
      table.string('rw').nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Clients', table =>{
      table.dropColumn('jalan');
      table.dropColumn('rt');
      table.dropColumn('rw');
  })
};
