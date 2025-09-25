const knexConfig = require('./knexfile');
const db = require('knex')(knexConfig.development);

db.raw('PRAGMA foreign_keys = ON').then(() => {
    console.log('SQLite foreign keys enabled.');
});

module.exports = db;

