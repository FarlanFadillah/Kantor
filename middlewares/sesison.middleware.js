const session = require('express-session')

const connect_sqlite3 = require('connect-sqlite3')(session);

const SQLiteStore = new connect_sqlite3({
    db : 'session',
    dir : './database',
    table : 'session'
})

const my_session = new session({
    store: SQLiteStore, // default store is using memory
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // one hour
    },
    rolling: true // <---- THIS refreshes the cookie on every response

})

module.exports = my_session;
