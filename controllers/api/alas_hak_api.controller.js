const asyncHandler = require('../../utils/asyncHandler');
const mainModel = require('../../models/main.model');
const { CustomError } = require('../../utils/custom.error');

/**
 * Alas Hak Api endpoint
 * @return alas hak by its id
 */
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


/**
 * Search alas hak by no_alas_hak
 */
const searchAlasHak = asyncHandler(async(req, res, next)=>{
    if(!req.query) 
        return res.status(200).json({success : false, msg : 'no_alas_hak is undefined'})

    const data = await mainModel.searchTable('Alas_Hak', ['no_alas_hak', 'address_code', 'id', 'no_surat_ukur'], req.query.keyword);
    res.status(200).json({success : true, data : data})
})


module.exports = {
    getAlasHak,
    searchAlasHak
}