const { CustomError } = require("../utils/custom.error");
const { makeDateString } = require("../utils/string_tools");
const mainModel = require('../models/main.model')



/**
 * 
 * @param {Object} data 
 * @return converted date time to local time asia/jakarta
 */
function convertLocalDT(data){
    data.created_at = makeDateString(data.created_at);
    data.updated_at = makeDateString(data.updated_at);
    data.added_at = makeDateString(data.added_at);

    return data;
}

/**
 * 
 * @param {string} table 
 * @param {integer} columnNames 
 * @returns modified table (adding arrays of Clients)
 */
function reduceAlasHakTable(table, columnNames){
    return table.reduce((acc, row)=>{
        for(const colName of columnNames){
            acc[colName] = row[colName];            
        }
        if(!acc['Clients']) acc['Clients'] = [];

        if(row.client_id) acc['Clients'].push({
            client_id : row.client_id,
            first_name : row.first_name,
            last_name : row.last_name
        });
        return acc;
    }, {});
};

/**
 * 
 * @param {Array} client_id 
 * @param {Number} alas_hak_id 
 * adding alas hak owner with many-to-many relation
 * (AlasHak_Clients)
 */
async function addAlasHakOwner(client_id, alas_hak_id){
    
    if(client_id !== undefined){
        if(!Array.isArray(client_id)) client_id = [client_id];
    
        try {
            for(const id of client_id){
            if(id){
                await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alas_hak_id});
            }
        }
        } catch (error) {
            throw new CustomError(error.message, 'error')
        }
    }
}

/**
 * 
 * @param {Array} client_id 
 * @param {Number} alas_hak_id 
 * update alas hak owner
 */
async function updateAlasHakOwner (client_id, alas_hak_id){

    await mainModel.del('AlasHak_Clients', {alasHak_id : alas_hak_id});

    if(client_id && client_id.length > 0){
        for(const id of client_id){
            if(id) await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alas_hak_id})
        }
    }
}


module.exports = {
    convertLocalDT,
    reduceAlasHakTable,
    addAlasHakOwner,
    updateAlasHakOwner
}