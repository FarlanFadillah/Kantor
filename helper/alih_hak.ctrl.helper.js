const mainModel =  require('../models/main.model')

/**
 * 
 * @param {String} table 
 * @param {Array} client_id 
 * @param {Number} alih_hak_id 
 */
async function addPihak (table, client_id, alih_hak_id){
    // delete if exists and add it later
    await mainModel.del(table, {'alih_hak_id' : alih_hak_id});
    
    if(client_id !== undefined){
        if(!Array.isArray(client_id)) client_id = [client_id];
    
        for(const id of client_id){
            if(id){
                await mainModel.add(table, {client_id : id, alih_hak_id : alih_hak_id});
            }
        }
    }
}

module.exports = {
    addPihak
}