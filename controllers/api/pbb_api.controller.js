const asyncHandler = require("../../utils/asyncHandler");
const mainModel = require('../../models/main.model');


const verifyPbb = asyncHandler(async(req, res, next)=>{
    const {nop} = req.query;

    if(!nop) res.status(400).json({success : false, msg : 'nop is undefined'})

    const pbb = await mainModel.get('PBB_SKNJOP', {nop : nop}, ['id', 'nop']);

    res.status(200).json({success : true, data : pbb || null});
});


module.exports = {
    verifyPbb
}