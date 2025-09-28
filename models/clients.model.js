const db = require('../database/db.js');
const {CustomError} = require("../utils/custom.error");

async function add(model){
    console.log(model);
    try {
        await db('Clients').insert(model);
    }catch (err) {
        throw new CustomError(e.message, 'error');
    }
}

async function update(field, model){
    try {
        await db('Clients').update(field).where(model);
    }catch (err) {
        throw new CustomError(err.message, 'error');
    }
}

async function del(model){
    try {
        await db('Clients').delete().where(model);
    }catch (err) {
        throw new CustomError(err.message, 'error');
    }
}

async function getClient(field, model){
    try {
        return await db('Clients').select(field).where(model).first();
    }catch (err){
        console.log(field);
        console.log(model);
        throw new CustomError(err.message, 'error');
    }
}

async function getClientBy(model){
    try {
        return await db('Clients').select('*').where(model).first();
    }catch (err) {
        throw new CustomError(err.message, 'error');
    }
}

async function getPaginationClientList(limit, offset){
    try{
        return await db('Clients').limit(limit).offset(offset).orderBy('updated_at');
    }catch (err){
        console.log(limit, offset);
        throw new CustomError(err.message, 'error');
    }
}

async function getClientTotal(){
    try {
        const totalCount = await db('Clients').count('* as total').first();
        return totalCount.total;
    }catch (err){
        throw new CustomError(err.message, 'error');
    }
}

module.exports = {
    add,
    del,
    getClient,
    getPaginationClientList,
    getClientTotal,
    getClientBy,
    update
};