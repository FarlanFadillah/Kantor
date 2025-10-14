/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('peralihan_hak', table =>{
    table.increments('id').primary();
    table.integer('no_akta');
    table.datetime('tgl_akta');
    table.enu('produk', ['AJB', 'HIBAH', 'WARIS', 'APHB']).notNullable();
    table.integer('bphtb_id').references('Bphtb.id').onUpdate('CASCADE');
    table.integer('alas_hak_id').references('Alas_Hak.id').onUpdate('CASCADE');
    table.boolean('pph').defaultTo(false);
    table.boolean('ceking_shm').defaultTo(false);
    table.boolean('znt_shm').defaultTo(false);
    table.string('catatan');
  })
  .createTable('penerima_hak', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('ph_id').references('peralihan_hak.id').onUpdate('CASCADE');
  })
  .createTable('pihak_persetujuan', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('ph_id').references('perlihan_hak.id').onUpdate('CASCADE'); 
  })
  .createTable('kuasa_jual', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('ph_id').references('perlihan_hak.id').onUpdate('CASCADE'); 
  })
  .createTable('kuasa_beli', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('ph_id').references('perlihan_hak.id').onUpdate('CASCADE'); 
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('peralihan_hak')
  .dropTable('penerima_hak')
  .dropTable('pihak_persetujuan')
  .dropTable('kuasa_jual')
  .dropTable('kuasa_beli')
};
