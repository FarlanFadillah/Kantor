/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Clients', table=>{
    table.dropColumns('provinsi');
    table.dropColumn('kab_kota');
    table.dropColumn('kec');
    table.dropColumn('kel');

    table.string('address_code');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Clients', table=>{
    table.string('provinsi');
    table.string('kab_kota');
    table.string('kec');
    table.string('kel');

    table.dropColumn('address_code');
  })
};
