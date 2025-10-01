function getRequireData(array, body){
    let fields = {};
    // Loop through keys
    for (const key in body) {
        if(array.includes(key)) fields[key] = body[key];
    }
    return fields;
}

module.exports = {
    getRequireData
}