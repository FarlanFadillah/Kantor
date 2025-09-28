const db = require('../database/db.js');
const {CustomError} = require("../utils/custom.error");

async function add(model){
    console.log(model);
    try {
        await db('Clients').insert(model);
    }catch (e) {
        throw new CustomError('Error creating Client DB', 'error');
    }
}

async function del(model){
    try {
        await db('Clients').delete().where(model);
    }catch (e) {

    }
}

async function getClient(field, model){
    try {
        return await db('Clients').select(field).where(model).first();
    }catch (err){
        console.log(field);
        console.log(model);
        throw new CustomError('Error getting client DB', 'error');
    }
}

async function getPaginationClientList(limit, offset){
    try{
        return await db('Clients').limit(limit).offset(offset).orderBy('updated_at');
    }catch (err){
        console.log(limit, offset);
        throw new CustomError('Error getting client DB', 'error');
    }
}

async function getClientTotal(){
    try {
        const totalCount = await db('Clients').count('* as total').first();
        return totalCount.total;
    }catch (err){
        throw new CustomError('Error getting client DB', 'error');
    }
}

module.exports = {
    add,
    del,
    getClient,
    getPaginationClientList,
    getClientTotal
};