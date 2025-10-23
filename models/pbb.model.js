const db = require('../database/db');
const { getAddressDetail } = require('../helper/address.form.helper');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const { CustomError } = require('../utils/custom.error');



// async function getPbbData(id){
//     try {
//         return await db('PBB_SKNJOP')
//         .leftJoin('Clients', 'PBB_SKNJOP.client_id', 'Clients.id')
//         .leftJoin('Alas_Hak', 'PBB_SKNJOP.alas_hak_id', 'Alas_Hak.id')
//         .select(
//             'PBB_SKNJOP.*',
//             'Clients.first_name as first_name', 'Clients.last_name as last_name', 'Clients.nik as client_nik',
//             'Alas_Hak.no_alas_hak', 'Alas_Hak.kel as alas_hak_kel'
//         ).where('PBB_SKNJOP.id', id).first();
//     } catch (error) {
//         throw new CustomError(error.message, 'error');
//     }
// }


async function getPbbData(id){
    try {
        const pbb = await db('PBB_SKNJOP').where('id', id).first();

        const [client, alas_hak] = await Promise.all([
            db('Clients')
            .where('Clients.id', pbb.client_id)
            .select(
                'id', 'first_name', 'last_name', 'nik'
            ).first(),

            db('Alas_Hak')
            .where('Alas_Hak.id', pbb.alas_hak_id)
            .select(
                'id', 'no_alas_hak', 'address_code'
            ).first()
        ])

        // convert datetime to local time
        convertLocalDT(pbb);

        // get address detail for alas_hak
        await getAddressDetail(alas_hak);

        // get address detail for pbb
        await getAddressDetail(pbb);

        return {...pbb, client, alas_hak};
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getPbbData
}