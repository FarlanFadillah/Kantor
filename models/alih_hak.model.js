const db = require('../database/db');
const { getAddressDetail } = require('../helper/address.form.helper');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const { CustomError } = require('../utils/custom.error');

/**
 * 
 * @param {Number} limit 
 * @param {Number} offset 
 * @param {Array} column 
 * @param {String} order 
 * @returns pagination alih hak data
 */
async function getAlihHakPagination(limit, offset, column, order = 'asc'){
    try {
        return await db('Alih_Hak')
        .leftJoin('Alas_Hak', 'Alih_Hak.alas_hak_id', 'Alas_Hak.id')
        .leftJoin('BPHTB', 'Alih_Hak.bphtb_id', 'BPHTB.id')
        .leftJoin('PBB_SKNJOP as pbb', 'pbb.id', 'BPHTB.pbb_id')
        .select(
            'Alih_Hak.no_akta', 'Alih_Hak.produk',
            'Alas_Hak.no_alas_hak',
            'pbb.nop',
            'Alih_Hak.id',
        ).limit(limit).offset(offset).orderBy(column, order);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

/**
 * 
 * @param {Number} id 
 * @returns alih hak data with all many-to-many / one-to-many relation table
 */
async function getAllAliHakData(id){
    try {

        const alih_hak = await db('Alih_Hak').where('id', id).first();

        const [penerima_hak, pihak_persetujuan, 
            kuasa_pemberi, kuasa_penerima,
            bphtb, alas_hak
        ] = await Promise.all([
            db('Clients')
            .leftJoin('penerima_hak', 'penerima_hak.client_id', 'Clients.id')
            .select(
                'Clients.id','Clients.first_name', 'Clients.last_name'
            ).where('penerima_hak.alih_hak_id', id),

            db('Clients')
            .leftJoin('pihak_persetujuan', 'pihak_persetujuan.client_id', 'Clients.id')
            .select(
                'Clients.id','Clients.first_name', 'Clients.last_name'
            ).where('pihak_persetujuan.alih_hak_id', id),

            db('Clients')
            .leftJoin('kuasa_pemberi', 'kuasa_pemberi.client_id', 'Clients.id')
            .select(
                'Clients.id','Clients.first_name', 'Clients.last_name'
            ).where('kuasa_pemberi.alih_hak_id', id),

            db('Clients')
            .leftJoin('kuasa_penerima', 'kuasa_penerima.client_id', 'Clients.id')
            .select(
                'Clients.id','Clients.first_name', 'Clients.last_name'
            ).where('kuasa_penerima.alih_hak_id', id),

            db('BPHTB')
            .leftJoin('Clients', 'Clients.id', 'BPHTB.client_id')
            .leftJoin('PBB_SKNJOP as pbb', 'pbb.id', 'BPHTB.pbb_id')
            .select(
                'BPHTB.id', 
                'Clients.first_name', 'Clients.last_name',
                'pbb.nop', 'BPHTB.pbb_id'
            )
            .where('BPHTB.id', alih_hak.bphtb_id)
            .first(),

            db('Alas_Hak')
            .select(
                'id', 'no_alas_hak', 'address_code'
            )
            .where('Alas_Hak.id', alih_hak.alas_hak_id)
            .first()

        ])
        return {...alih_hak, penerima_hak, pihak_persetujuan, kuasa_pemberi, kuasa_penerima, bphtb, alas_hak};
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getAlihHakPagination,
    getAllAliHakData
}