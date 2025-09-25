const db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename : './database/main.sqlite3'
        },
        useNullAsDefault : false,
        migrations :{
            directory : './migrations'
        }

    });

db.raw('PRAGMA foreign_keys = ON').then(() => {
    console.log('SQLite foreign keys enabled.');
});

module.exports = db;

