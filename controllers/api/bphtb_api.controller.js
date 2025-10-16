const asyncHandler = require("../../utils/asyncHandler");
const bphtbModel = require('../../models/bphtb.model')

/**
 * Search bphtb with key (column name) and value with query paramater
 */
const searchBphtb = asyncHandler(async(req, res, next)=>{
    if(!req.query || !req.query.key || !req.query.value) return res.status(404).json({success : false, msg : 'key and value missing'});

    const client = await bphtbModel.searchBphtbWithReferences(req.query);

    res.status(200).json({success : true, data : client});
});



module.exports = {
    searchBphtb
}