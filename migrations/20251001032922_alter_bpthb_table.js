/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Bphtb', table=>{
        table.dropColumn('alas_hak');
        table.dropColumn('no_alas_hak');


        table.string('alas_hak_id').nullable()
            .references('Alas_Hak.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Bphtb', table=>{
      table.enu('alas_hak', ['SHM', 'SHGB', 'PETA_BIDANG', "NIB"]).defaultTo('SHM');
      table.string('no_alas_hak').notNullable();

      table.dropColumn('alas_hak_id');
  });
};
