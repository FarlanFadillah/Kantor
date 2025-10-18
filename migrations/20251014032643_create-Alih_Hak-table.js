/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Alih_Hak', table =>{
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

    table.datetime('added_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('penerima_hak', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('alih_hak_id').references('Alih_Hak.id').onUpdate('CASCADE').onDelete('CASCADE');
  })
  .createTable('pihak_persetujuan', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('alih_hak_id').references('Alih_Hak.id').onUpdate('CASCADE').onDelete('CASCADE'); 
  })
  .createTable('kuasa_pemberi', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('alih_hak_id').references('Alih_Hak.id').onUpdate('CASCADE').onDelete('CASCADE'); 
  })
  .createTable('kuasa_penerima', table=>{
    table.integer('client_id').references('Clients.id').onUpdate('CASCADE');
    table.integer('alih_hak_id').references('Alih_Hak.id').onUpdate('CASCADE').onDelete('CASCADE'); 
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('Alih_Hak')
  .dropTable('penerima_hak')
  .dropTable('pihak_persetujuan')
  .dropTable('kuasa_pemberi')
  .dropTable('kuasa_penerima')
};
