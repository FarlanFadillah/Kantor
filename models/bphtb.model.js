const db = require('../database/db');
const { getAddressDetail } = require('../helper/address.form.helper');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const { CustomError } = require('../utils/custom.error');


async function getBphtbAllList(){
    try {
        let bphtb_list = [];
        const bphtb = await db('Bphtb').select('*');
        for(const data of bphtb){

            const [alas_hak, client] = await Promise.all([
                db('Alas_Hak')
                .where('id', data.alas_hak_id)
                .select('id', 'no_alas_hak', 'address_code')
                .first(),

                db('Clients')
                .where('id', data.client_id)
                .select('first_name', 'last_name', 'id', 'address_code')
                .first()
            ])
            bphtb_list.push({...data, alas_hak, client});
        }

        return bphtb_list;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getBphtbData(id){
    try {
        const bphtb = await db('BPHTB').where('id', id).first();
        const [
            client, alas_hak, pbb
        ] = await Promise.all([
            db('Clients')
            .where('id', bphtb.client_id)
            .select(
                'id', 'first_name', 'last_name', 'nik'
            ).first(),

            db('Alas_Hak')
            .where('id', bphtb.alas_hak_id)
            .select(
                'id', 'no_alas_hak', 'address_code'
            ).first(),

            db('PBB_SKNJOP as pbb')
            .where('pbb.id', bphtb.pbb_id)
            .select(
                'id', 'nop'
            ).first()
        ]);

        convertLocalDT(bphtb);

        await getAddressDetail(alas_hak);

        return {...bphtb, client, alas_hak, pbb}
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


async function searchBphtbWithReferences(query){
    try {
        return await db('BPHTB')
        .leftJoin('Alas_Hak', 'BPHTB.alas_hak_id', 'Alas_Hak.id')
        .leftJoin('Clients', 'BPHTB.client_id', 'Clients.id')
        .leftJoin('PBB_SKNJOP', 'BPHTB.pbb_id', 'PBB_SKNJOP.id')
        .select(
            'BPHTB.id', 'BPHTB.produk',
            'Alas_Hak.no_alas_hak',
            'Clients.first_name', 'Clients.last_name',
            'PBB_SKNJOP.nop'
        )
        .whereLike('BPHTB.'+query.key, '%'+query.value+'%');
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

/**
 * 
 * @param {String} keyword 
 * @param {Array} column 
 * @returns 
 */
async function searchBphtbTable(keyword, column){
    try {
        return await db('BPHTB')
        .leftJoin('Alas_Hak', 'BPHTB.alas_hak_id', 'Alas_Hak.id')
        .leftJoin('Clients', 'BPHTB.client_id', 'Clients.id')
        .leftJoin('PBB_SKNJOP', 'BPHTB.pbb_id', 'PBB_SKNJOP.id')
        .select(
            'BPHTB.id', 'BPHTB.produk',
            'Alas_Hak.no_alas_hak',
            'Clients.first_name', 'Clients.last_name',
            'PBB_SKNJOP.nop'
        )
        .where(function(){
            column.forEach((col, i)=>{
                if(i === 0) this.where(col, 'like', `%${keyword}%`);
                else this.orWhere(col, 'like', `%${keyword}%`);
            })
        });
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getBphtbAllList,
    getBphtbData,
    searchBphtbWithReferences,
    searchBphtbTable
}