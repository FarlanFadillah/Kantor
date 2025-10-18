const asyncHandler = require("../../utils/asyncHandler");
const mainModel = require('../../models/main.model');

/**
 * Clients Api endpoint
 * 
 * @return client data by nik column
 */
const verifyClientsNik = asyncHandler(async (req, res, next) => {
    // getting client data by its id with specific columns
    const client = await mainModel.get('Clients', req.query, ['id', 'first_name', 'last_name']);

    // if the id does not exist, return 404
    if(!client) return res.status(404).json({success : false, msg : 'client not found'});

    // send the data
    res.status(200).json({success : true, user : client});
});

/**
 * Search client with keyword and spesific column name
 */
const searchClient = asyncHandler(async(req, res, next)=>{
    if(!req.query) return res.status(404).json({success : false, msg : 'key and value missing'});

    const client = await mainModel.searchTable('Clients', ['id', 'nik', 'first_name', 'last_name'], req.query.keyword);

    res.status(200).json({success : true, data : client});
})

module.exports = {
    verifyClientsNik,
    searchClient
}