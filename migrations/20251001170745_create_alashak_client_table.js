/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('AlasHak_Clients', table=>{
        table.integer('client_id').references('Clients.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('alasHak_id').references('Alas_Hak.id').onDelete('CASCADE').onUpdate('CASCADE');

        table.primary(['Client_id', 'alasHak_id']);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('AlasHak_Clients');
};
