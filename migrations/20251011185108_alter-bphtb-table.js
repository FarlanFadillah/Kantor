/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Bphtb', table=>{
    table.integer('pbb_id').nullable();
    
    table.foreign('pbb_id').references('PBB_SKNJOP.id').onUpdate('CASCADE').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Bphtb', table=>{
    table.dropColumn('pbb_id');
  })
};
