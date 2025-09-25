const db = require('../database/db');
const { CustomError } = require('../utils/custom.error');

async function getUser(username){
    try {
        return await db('Users')
        .where('username', username)
        .select('*')
        .first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function createUser(user){
    try {
        await db('Users')
        .insert(user)
        .then(([id]) => {
            console.log(id);
        })
        .catch((err) => {
            if(err.code === 'SQLITE_CONSTRAINT'){
                throw new Error('User already exists');
            }
            throw err;
        });
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getUser,
    createUser,
}