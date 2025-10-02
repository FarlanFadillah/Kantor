/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Clients', table=>{
    table.dropColumn('phone_number');
  }).alterTable('Clients', table=>{
    table.string('phone_number').nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Clients', table=>{
    table.dropColumn('phone_number');
  }).alterTable('Clients', table=>{
    table.string('phone_number').notNullable();
  })
};
