/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Alas_Hak', table => {
    // identifications fields
    table.increments('id').primary();
    table.string('no_alas_hak').notNullable().unique();
    table.enu('jenis_hak', ['SHM', 'SHGB', 'PETA_BIDANG', "NIB"]).notNullable();
    table.integer('luas').notNullable();
    table.datetime('tgl_alas_hak').nullable();

    // adress fields
    table.string('provinsi').notNullable();
    table.string('kec').notNullable();
    table.string('kel').notNullable();
    table.string('jor').nullable();

    // surat ukur fields
    table.string('no_surat_ukur').nullable();
    table.datetime('tgl_surat_ukur').nullable();

    // additional fields
    table.string('ket').nullable();

    // timestamp
    table.datetime('added_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('Alas_hak');
};
