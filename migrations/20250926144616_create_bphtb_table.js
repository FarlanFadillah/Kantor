/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Bphtb', table => {
        table.increments('id').primary();
        table.enu('produk', ['AJB', 'HIBAH', 'WARIS', 'APHB', 'HAK_BARU']).defaultTo('AJB');
        table.enu('alas_hak', ['SHM', 'SHGB', 'PETA_BIDANG', "NIB"]).defaultTo('SHM');
        table.string('no_alas_hak').notNullable();
        table.string('client_id').references('Clients.id').onUpdate('CASCADE').onDelete('CASCADE');

        table.bigInteger('hasil_survei').nullable();
        table.datetime('tgl_survei').nullable();

        table.boolean('perintah_bayar').defaultTo(false);
        table.boolean('lunas').defaultTo(false);

        table.string('status').nullable();

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());

        table.boolean('selesai').defaultTo(false);
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Bphtb')
};
