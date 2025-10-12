const db = require('../database/db');
const { CustomError } = require('../utils/custom.error');



async function getPbbData(id){
    try {
        return await db('PBB_SKNJOP')
        .leftJoin('Clients', 'PBB_SKNJOP.client_id', 'Clients.id')
        .leftJoin('Alas_Hak', 'PBB_SKNJOP.alas_hak_id', 'Alas_Hak.id')
        .select(
            'PBB_SKNJOP.*',
            'Clients.first_name as client_first_name', 'Clients.last_name as client_last_name', 'Clients.nik as nik_client',
            'Alas_Hak.no_alas_hak', 'Alas_Hak.kel as alas_hak_kel'
        ).where('PBB_SKNJOP.id', id).first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getPbbData
}