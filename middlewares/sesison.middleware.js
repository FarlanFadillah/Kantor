const session = require('express-session')

const connect_sqlite3 = require('connect-sqlite3')(session);

const SQLiteStore = new connect_sqlite3({
    db : 'session',
    dir : './database',
    table : 'session'
})

/**
 * Express session configuration.
 * 
 * This session middleware manages user sessions across requests.
 * It uses SQLite as the session store (instead of the default in-memory store)
 * to persist session data even after the server restarts.
 * 
 * **Key configurations:**
 * - `store`: Uses `SQLiteStore` for persistent session storage.
 * - `secret`: Encryption key for signing the session ID cookie.
 * - `resave`: Forces the session to be saved on every request, even if it wasn’t modified.
 * - `saveUninitialized`: Prevents saving empty sessions.
 * - `cookie.maxAge`: Sets session lifetime to 1 hour.
 * - `rolling`: Refreshes the session expiration timer on every client response.
 * 
 * Example:
 * ```js
 * import session from 'express-session';
 * import SQLiteStore from 'connect-sqlite3';
 * 
 * const my_session = new session({
 *   store: new SQLiteStore(),
 *   secret: process.env.SESSION_SECRET || 'supersecretkey',
 *   resave: true,
 *   saveUninitialized: false,
 *   cookie: { maxAge: 1000 * 60 * 60 },
 *   rolling: true
 * });
 * 
 * app.use(my_session);
 * ```
 * 
 * @constant
 * @type {import('express-session').RequestHandler}
 * 
 * @property {object} store - Session store, using SQLite for persistence.
 * @property {string} secret - Secret key for signing the session ID cookie.
 * @property {boolean} resave - Whether to force session save even when unmodified.
 * @property {boolean} saveUninitialized - Whether to save new but unmodified sessions.
 * @property {object} cookie - Configuration for the session cookie.
 * @property {number} cookie.maxAge - Session lifetime in milliseconds (default: 1 hour).
 * @property {boolean} rolling - Whether to refresh cookie expiration time on every response.
 */

const my_session = new session({
    store: SQLiteStore, // default store is using memory
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 6, // SIX hours
    },
    rolling: true // <---- THIS refreshes the cookie on every response

})

module.exports = my_session;
