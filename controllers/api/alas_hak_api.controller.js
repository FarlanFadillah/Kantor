const asyncHandler = require('../../utils/asyncHandler');
const mainModel = require('../../models/main.model');
const {CustomError} = require("../../utils/custom.error");


const getAlasHak = asyncHandler(async (req, res, next)=>{
    const alasHak = await mainModel.get('Alas_Hak', req.query, ['id', 'no_alas_hak', 'kel']);

    if(!alasHak) return next(new CustomError('Data not found', 'error', 400));

    console.log(alasHak);

    res.status(200).json({
        success : true,
        alasHak : alasHak
    })
});


module.exports = {
    getAlasHak,
}