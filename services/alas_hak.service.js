const { getAddressDetail } = require('../helper/address.form.helper');
const { convertLocalDT, addAlasHakOwner, updateAlasHakOwner } = require('../helper/alas_hak_ctrl.helper');
const alasHakModel = require('../models/alas_hak.model');
const mainModel = require('../models/main.model');
const { CustomError } = require('../utils/custom.error');

async function getAlasHakFormData(id){
    try {
        return await alasHakModel.getAlasHakData(id);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getAlasHakViewData(id) {
    try {
        const alas_hak = await alasHakModel.getAlasHakData(id);
    
        const alas_hak_local_time = convertLocalDT(alas_hak);

        const alas_hak_final = await getAddressDetail(alas_hak_local_time);

        return alas_hak_final;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getAlasHakListData(limit, offset) {
    try {
        const total_pages = Math.ceil(await mainModel.count('Alas_Hak') / Number(limit));
        
        const alas_hak_data = await mainModel.getPaginationList(
            'Alas_Hak', 
            ['no_alas_hak', 'luas', 'tgl_surat_ukur', 'no_surat_ukur', 'id'],
            limit, 
            offset, 
            'id', 
            'desc'
        );

        return {alas_hak_data, total_pages};
    } catch (error) {
        throw new CustomError(error.message, 'error')
    }
}

async function addAlasHak(alas_hak_data, clients_id) {
    try {
        const alas_hak = await mainModel.addReturnColumn('Alas_hak', alas_hak_data, 'id');

        if (clients_id) await addAlasHakOwner(clients_id, alas_hak.id);
        
        return alas_hak.id;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }

}

async function updateAlasHak(alas_hak_id, alas_hak_data, clients_id) {
    try {
        //console.log('fields', fields);
        await mainModel.update('Alas_Hak', alas_hak_data, {id : alas_hak_id});

        // update alas hak owner
        await updateAlasHakOwner(clients_id, alas_hak_id);

    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function deleteAlasHak(alas_hak_id) {
    try {
        await mainModel.del('Alas_Hak', {id : alas_hak_id});
    } catch (error) {
        
    }
}

module.exports = {
    getAlasHakFormData,
    getAlasHakViewData,
    getAlasHakListData,
    addAlasHak,
    updateAlasHak,
    deleteAlasHak
}