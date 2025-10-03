const asyncHandler = require('../../utils/asyncHandler');
const mainModel = require('../../models/main.model');

const getAlasHak = asyncHandler(async (req, res, next)=>{
    // getting alashak data by its id with specific columns
    const alasHak = await mainModel.get('Alas_Hak', req.query, ['id', 'no_alas_hak', 'kel']);

    // if the id does not exist, return 404
    if(!alasHak) return res.status(404).json({success : false, msg : 'Data not found'});

    // send the data
    res.status(200).json({
        success : true,
        alasHak : alasHak
    })
});


module.exports = {
    getAlasHak,
}