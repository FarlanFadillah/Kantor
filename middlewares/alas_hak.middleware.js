const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model')

const getAlasHakOwner = asyncHandler(async(req, res, next)=>{
    res.locals.alas_hak = {};
    const alashak_client = await mainModel.getAll('AlasHak_Clients', req.query)
    let owners = [];

    for(const {client_id} of alashak_client){
        owners.push(await mainModel.get('Clients', {id : client_id}, ["id", "first_name", "last_name"]))
    }
    res.locals.alas_hak_owners = owners;


    next();
});


module.exports = {
    getAlasHakOwner
}