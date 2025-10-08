const { makeDateString } = require("../utils/string_tools");

function getRequireData(array, body){
    let fields = {};
    // Loop through keys
    for (const key in body) {
        if(array.includes(key)) fields[key] = body[key];
    }
    return fields;
}

function convertLocalDT(data){
    data.created_at = makeDateString(data.created_at);
    data.updated_at = makeDateString(data.updated_at);
    data.added_at = makeDateString(data.added_at);
}


function reduceTable(table){
    return table.reduce((acc, row)=>{
                for(const colName of columNames){
                    acc[colName] = row[colName];            
                }
                if(!acc['Clients']) acc['Clients'] = [];

                console.log(row)
                acc['Clients'].push({
                    client_id : row.client_id,
                    first_name : row.first_name,
                    last_name : row.last_name
                });

                return acc;
            }, {});
}

module.exports = {
    getRequireData,
    convertLocalDT
}