const asyncHandler = require("../../utils/asyncHandler");
const mainModel = require('../../models/main.model');


const verifyClientsNik = asyncHandler(async (req, res, next) => {

    const user = await mainModel.get('Clients', req.query, ['id', 'first_name', 'last_name']);
    if(!user) return res.status(404).json({success : false, msg : 'client not found'});
    res.status(200).json({success : true, user});
});

module.exports = {
    verifyClientsNik
}