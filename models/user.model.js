const db = require('../database/db');

async function getUser(username){
    db('Users')
        .select('*')
        .where('username', username)
        .first()
        .catch((err) => {
            throw err; // fallback for other DB errors
        })
}

async function createUser(user){
    db('Users')
        .insert(user)
        .then(([id]) => {
            console.log(id);
        })
        .catch((err) => {
            if(err.code === 'SQLITE_CONSTRAINT'){
                throw new Error('User already exists');
            }
            throw err;
        })
}

module.exports = {
    getUser,
    createUser,
}