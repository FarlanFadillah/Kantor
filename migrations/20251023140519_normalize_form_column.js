/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('alas_hak', table=>{
    table.dropColumn('provinsi');
    table.dropColumn('kab_kota')
    table.dropColumn('kec');
    table.dropColumn('kel');

    table.string('address_code')
  }).alterTable('PBB_SKNJOP', table=>{
    table.dropColumn('provinsi');
    table.dropColumn('kab_kota')
    table.dropColumn('kec');
    table.dropColumn('kel');

    table.string('address_code')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('alas_hak', table=>{
    table.string('provinsi');
    table.string('kec');
    table.string('kel');
    table.string('kab_kota');

    table.dropColumn('address_code');
  }).alterTable('PBB_SKNJOP', table=>{
    table.string('provinsi');
    table.string('kec');
    table.string('kel');
    table.string('kab_kota');

    table.dropColumn('address_code');
  })
};
