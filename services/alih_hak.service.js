const mainModel = require('../models/main.model');
const alihHakModel = require('../models/alih_hak.model');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const { getAddressDetail } = require('../helper/address.form.helper');
const { CustomError } = require('../utils/custom.error');
const { addPihak } = require('../helper/alih_hak.ctrl.helper');

async function getAlihHakData(id) {
    try {
        const alih_hak = await alihHakModel.getAllAliHakData(id);
        
        const alih_hak_final = convertLocalDT(alih_hak);

        alih_hak_final.alas_hak = await getAddressDetail(alih_hak_final.alas_hak);

        return alih_hak_final;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getAlihHakDataList(limit, offset){
    try {
        const total_pages = Math.ceil(await mainModel.count('Alih_Hak') / Number(limit));

        const alih_hak_data = await alihHakModel.getAlihHakPagination(
            limit, 
            offset, 
            'Alih_Hak.id', 
            'desc'
        );

        return {alih_hak_data, total_pages};
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function addAlihHak(alih_hak_data, clients_id){
    try {
        const alih_hak = await mainModel.addReturnColumn('Alih_Hak', {
            ...alih_hak_data,
            ceking_shm  : alih_hak_data.ceking_shm || false,
            znt_shm     : alih_hak_data.znt_shm || false,
            pph         : alih_hak_data.pph || false
        }, 'id');

        const {penerima_hak_id, 
            pihak_persetujuan_id, 
            kuasa_pemberi_id, 
            kuasa_penerima_id} = clients_id;

        await addPihak('penerima_hak', penerima_hak_id, alih_hak.id);
        await addPihak('pihak_persetujuan', pihak_persetujuan_id, alih_hak.id);
        await addPihak('kuasa_pemberi', kuasa_pemberi_id, alih_hak.id);
        await addPihak('kuasa_penerima', kuasa_penerima_id, alih_hak.id);

        return alih_hak.id;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function updateAlihHak(alih_hak_id, alih_hak_data, clients_id){
    try {
        await mainModel.update('Alih_Hak', {
            ...alih_hak_data,
        }, {id : alih_hak_id});

        const {penerima_hak_id, 
            pihak_persetujuan_id, 
            kuasa_pemberi_id, 
            kuasa_penerima_id} = clients_id;

        await addPihak('penerima_hak', penerima_hak_id, alih_hak_id);
        await addPihak('pihak_persetujuan', pihak_persetujuan_id, alih_hak_id);
        await addPihak('kuasa_pemberi', kuasa_pemberi_id, alih_hak_id);
        await addPihak('kuasa_penerima', kuasa_penerima_id, alih_hak_id);

    } catch (error) {
        console.log(alih_hak_id, alih_hak_data, clients_id);
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getAlihHakData,
    getAlihHakDataList,
    addAlihHak,
    updateAlihHak
}