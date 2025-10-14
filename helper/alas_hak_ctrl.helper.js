const { makeDateString } = require("../utils/string_tools");

/**
 * 
 * @param {Array} array 
 * @param {Object} body 
 * @returns filtered object. 
 */
function getRequireData(filter, object){
    let fields = {};
    // Loop through keys
    for (const key in object) {
        if(filter.includes(key)) fields[key] = object[key];
    }
    return fields;
}

/**
 * 
 * @param {Object} data 
 * @return converted date time to local time asia/jakarta
 */
function convertLocalDT(data){
    data.created_at = makeDateString(data.created_at);
    data.updated_at = makeDateString(data.updated_at);
    data.added_at = makeDateString(data.added_at);
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

module.exports = {
    getRequireData,
    convertLocalDT,
    reduceAlasHakTable,
}