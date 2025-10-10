/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('PBB_SKNJOP', table=>{
    table.increments('id').primary();
    table.string('nop').unique();
    

    // adress fields
    table.string('provinsi').notNullable();
    table.string('kec').notNullable();
    table.string('kel').notNullable();
    table.string('jor').nullable();


    // foreign
    table.string('client_id').nullable();
    table.foreign('client_id').references('Clients.id').onUpdate('CASCADE').onDelete('CASCADE');

    table.string('alas_hak_id').nullable();
    table.foreign('alas_hak_id').references('Alas_Hak.id').onUpdate('CASCADE').onDelete('CASCADE');

    // land informations
    table.integer('luas_tanah').defaultTo(0);
    table.integer('luas_bangunan').defaultTo(0);
    table.bigInteger('njop').nullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('PBB_SKNJOP');
};
