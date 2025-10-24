const asyncHandler = require("../../utils/asyncHandler");
const mainModel = require('../../models/main.model');


/**
 * verify pbb by nop and return the row for certain column
 */
const verifyPbb = asyncHandler(async(req, res, next)=>{
    const {nop} = req.query;

    if(!nop) res.status(400).json({success : false, msg : 'nop is undefined'})

    const pbb = await mainModel.get('PBB_SKNJOP', {nop : nop}, ['id', 'nop']);

    res.status(200).json({success : true, data : pbb || null});
});

/**
 * Search pbb by keyword for certain column name
 */
const searchPbb = asyncHandler(async(req, res, next)=>{
    if(!req.query) return res.status(400).json({success : false, msg : 'Key and Value missing'});

    const pbb = await mainModel.searchTable('PBB_SKNJOP', ['id', 'nop', 'address_code'], req.query.keyword);

    res.status(200).json({success : true, data : pbb})
})


module.exports = {
    verifyPbb,
    searchPbb
}