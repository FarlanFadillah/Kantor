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

module.exports = {
    getRequireData,
    convertLocalDT
}