const asyncHandler = require("../../utils/asyncHandler");
const clientModel = require('../../models/clients.model')


const verifyClientsNik = asyncHandler(async (req, res, next) => {

    const user = await clientModel.getClient(['first_name', 'last_name'], req.query);
    if(!user) return res.status(404).json({success : false, msg : 'client not found'});
    res.status(200).json({success : true, user});
});

module.exports = {
    verifyClientsNik
}