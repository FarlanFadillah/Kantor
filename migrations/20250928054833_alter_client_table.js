/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Clients', table =>{
      table.datetime('added_at');
      table.datetime('updated_at');
  }).then(() =>{
      return knex('Clients').update({
          added_at : knex.fn.now(),
          updated_at : knex.fn.now(),
      })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Clients', table =>{
        table.dropColumn('added_at');
        table.dropColumn('updated_at');
    });
};
