
const db = require('../database/db');
const { addAddressDetail } = require('../helper/address.form.helper');
const { CustomError } = require('../utils/custom.error');
const { getRequireData } = require('../utils/customize_obj');


/**
 * @param {string} table
 */
async function getAll(table){
    try {
        return await db(table).select('*');
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}
/**
 * @param {string} table
 * @param {string} model
 */
async function getAllWhere(table, model){
    try {
        return await db(table).select('*').where(model);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}
/**
 * @param {string} table
 * @param {string} model
 * @param {Array} fields
 */
async function get(table, model, fields = ['*']){
    try {
        return await db(table).select(fields || '*').where(model).first();
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table
 * @param {string} filter
 */
async function filter(table, filter){
    try {
        return await db(table).where(filter).select('*');
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table table's name
 * @param {string} model table's data
 * @param {string} column return column
 * @returns one or more column after inserting data
 */
async function addReturnColumn(table, model, column){
    try {
        // getting the required fields
        // prevent other column added
        // helping the AlasHak_Clients table data insertion
        let column_name = await getAllColumnName(table);
        const fields = getRequireData(column_name, model);

        const [res] = await db(table).insert(fields).returning(column);
        return res;
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table
 * @param {Object} model
 */
async function add(table, model){
    try {
        await db(table).insert(model);
    }catch(err){
        console.log(model);
        if(err.message.includes('SQLITE_CONSTRAINT: UNIQUE')) throw new CustomError('Data already exist', 'error', 200)
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table
 * @param {string} model
 */
async function del(table, model){
    try {
        await db(table).delete().where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table
 * @param {string} model
 * @param {Array} fields
 */
async function update(table, fields, model){
    try {
        // getting the required fields
        // prevent other column added
        // helping the AlasHak_Clients table data insertion
        let column_name = await getAllColumnName(table);
        let data = getRequireData(column_name, fields);

        await db(table).update({...data, updated_at : db.fn.now()}).where(model);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {string} table
 * @return the total of rows
 */
async function count(table){
    try {
        const rows = await db(table).count('* as total').first();
        return rows.total;
    } catch (error) {
        
    }
}

/**
 * @param {string} table
 * @param {Array} fields
 * @param {integer} limit
 * @param {integer} offset
 * @param {string} column
 * @param {string} order
 * @return all pagination data from a table
 */
async function getPaginationList(table, fields, limit, offset, column, order = 'asc'){
    try{
        return await db(table).select(fields).limit(limit).offset(offset).orderBy(column, order);
    }catch (err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * 
 * @param {string} table 
 * @returns arrays of all column name from a table
 */
async function getAllColumnName(table){
    try {
        const table_info =  await db.raw(`PRAGMA table_info(${table})`);
        const column_name = [];

        table_info.forEach(element => {
            column_name.push(element.name);
        });

        return column_name;

    } catch (error) {
        throw new CustomError(err.message, 'error');
    }
}

/**
 * 
 * @param {string} table 
 * @param {Array} model 
 * @returns a boolean wether a certain row is exist
 */
async function rowExist(table, model){
    try {
        return !! await db(table).select('*').where(model).first();
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * @param {Object} options
 * @param {string} [options.table1_key]
 * @param {string} [options.table2_key]
 * @param {Array} [options.fields]
 */
async function joinTwoTable(table1, table2, options = {}){
    const {
        table1_key,
        table2_key,
        fields = []
    } = options;
    try {
        return await db(table1)
            .join(table2, table1_key, table2_key)
            .select(fields);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function joinTableWithJunction(table1, table2, j_table, options = {}){
    const {
        table1_key,
        table2_key,
        j_table_key,
        field = []
    } = options;

    try {
        return await db(table)
            .join(j_table, table1_key, j_table_key)
            .join(table2, j_table_key, table2_key)
            .select(field);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

/**
 * 
 * @param {string} table 
 * @param {Object} model 
 * @param {Array} field 
 * @returns rows that match the model
 */
async function search(table, query, field = ['*']){
    try {
        // console.log(await db(table).select(field).whereLike(query.key, '%'+query.value+'%').toQuery());
        return await db(table).select(field).whereLike(query.key, '%'+query.value+'%');
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

/**
 * 
 * @param {String} table 
 * @param {Array} column 
 * @param {String} keyword 
 * @returns 
 */
async function searchTable(table, column, keyword){
    try {
        const result =  await db(table).where(function (){
            column.forEach((col, i)=>{
                if(i === 0) this.where(col, 'like', `%${keyword}%`);
                else this.orWhere(col, 'like', `%${keyword}%`)
            })
        }).select(column)

        await Promise.all(
            result.map(async (data)=>{
                await addAddressDetail(data);
            })
        )

        return result;
    } catch (error) {
        throw new CustomError(error.message, 'error');
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
    getAllColumnName,
    addReturnColumn,
    filter,
    rowExist,
    getAllWhere,
    joinTwoTable,
    joinTableWithJunction,
    search,
    searchTable
}

