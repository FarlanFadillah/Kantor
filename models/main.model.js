
const db = require('../database/db');
const { CustomError } = require('../utils/custom.error'); 



async function getAll(table){
    try {
        return await db(table).select('*');
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function get(table, model, field = '*'){
    try {
        return await db(table).select(field).where(model).first();
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function add(table, model){
    try {
        const [{id}] = await db(table).insert(model).returning('id');
        return id;
    }catch(err){
        console.log(model);
        throw new CustomError(err.message, 'error');
    }
}

async function del(table, model){
    try {
        await db(table).delete().where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function update(table, field, model){
    try {
        await db(table).update({...field, updated_at : db.fn.now()}).where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function count(table){
    try {
        const rows = await db(table).count('* as total').first();
        return rows.total;
    } catch (error) {
        
    }
}

async function getPaginationList(table, fields, limit, offset, column, order = 'asc'){
    try{
        return await db(table).select(fields).limit(limit).offset(offset).orderBy(column, order);
    }catch (err){
        throw new CustomError(err.message, 'error');
    }
}

async function getAllColumnName(table){
    try {
        const table_info =  await db.raw(`PRAGMA table_info(${table})`);
        const column_name = [];

        table_info.forEach(element => {
            column_name.push(element.name);
        });

        return column_name;

    } catch (error) {
        
    }
}


module.exports = {
    add,
    getAll,
    get, 
    getPaginationList, 
    update,
    del, 
    count,
    getAllColumnName
}

