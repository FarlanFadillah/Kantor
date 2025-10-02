/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('AlasHak_Clients', table=>{
        table.integer('client_id').references('Clients.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('alasHak_id').references('Alas_Hak.id').onDelete('CASCADE').onUpdate('CASCADE');

        table.primary(['Client_id', 'alasHak_id']);

        table.datetime('added_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('AlasHak_Clients');
};
