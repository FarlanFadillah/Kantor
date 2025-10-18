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

module.exports = {
    getRequireData
}