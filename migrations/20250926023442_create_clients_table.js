/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Clients', table => {
        table.string('nik').unique().primary();
        table.string('first_name').notNullable();
        table.string('last_name').nullable();

        table.datetime('birth_date').notNullable();
        table.string('birth_place').notNullable();

        table.string('job_name').notNullable();

        table.enu('marriage_status', ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']).notNullable();

        table.enu('gender', ['Laki-Laki', 'Perempuan']).notNullable();

        table.string('provinsi').notNullable();
        table.string('kota/kab').notNullable();
        table.string('kec').notNullable();
        table.string('kel').notNullable();

        table.string('phone_number').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Clients');
};
