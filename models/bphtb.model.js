const db = require('../database/db')
const {CustomError} = require("../utils/custom.error");

async function getAll(){
    try{
        return await db('Bphtb').select('*');
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function getOne(id){
    try {
        return await db('Bphtb').select('*').where('id', id).first();
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function add(model){
    try {
        await db('Bphtb').insert(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function del(model){
    try {
        await db('Bphtb').delete().where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function update(field, model){
    try {
        await db('Bphtb').update(field).where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}


module.exports = {
    getAll,
    getOne,
    add,
    del,
    update
}