const mainModel = require('../models/main.model');
const bphtbModel= require('../models/bphtb.model');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const { addAddressDetail } = require('../helper/address.form.helper');
const { CustomError } = require('../utils/custom.error');

async function getBphtbData(bphtb_id){
    try {
        const bphtb_data = await bphtbModel.getBphtbData(bphtb_id);

        convertLocalDT(bphtb_data);

        await addAddressDetail(bphtb_data.alas_hak);

        return bphtb_data;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


async function addBphtb(bphtb_data){
    try {

        // making sure the pbb_id is either have value or null
        bphtb_data.pbb_id = bphtb_data.id || null;

        const bphtb = await mainModel.addReturnColumn('Bphtb', {
            ...bphtb_data
        }, 'id');

        return bphtb.id;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


module.exports = {
    getBphtbData,
    addBphtb
}