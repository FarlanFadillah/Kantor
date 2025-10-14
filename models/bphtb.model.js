const db = require('../database/db');
const { CustomError } = require('../utils/custom.error');


async function getBphtbAllList(){
    try {
        return await db('Bphtb')
        .leftJoin('Clients', 'Bphtb.client_id', 'Clients.id')
        .leftJoin('Alas_Hak', 'Bphtb.alas_hak_id', 'Alas_Hak.id')
        .select(
            'Bphtb.id as id', 'Bphtb.produk as produk', 
            'Bphtb.alas_hak_id', 'Bphtb.lunas', 
            'Bphtb.hasil_survei', 

            'Alas_Hak.no_alas_hak', 'Alas_Hak.kel as alas_hak_kel', 
            
            'Clients.id as client_id', 'Clients.first_name',
            'Clients.last_name'
        );
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getBphtbData(id){
    try {
        return await db('Bphtb').where('Bphtb.id', id)
        .leftJoin('Clients', 'Bphtb.client_id', 'Clients.id')
        .leftJoin('Alas_Hak', 'Bphtb.alas_hak_id', 'Alas_Hak.id')
        .leftJoin('PBB_SKNJOP', 'Bphtb.pbb_id', 'PBB_SKNJOP.id')
        .select(
            'Bphtb.*', 

            'Alas_Hak.no_alas_hak as no_alas_hak', 'Alas_Hak.kel as alas_hak_kel', 
            
            'Clients.id as client_id', 'Clients.first_name as first_name',
            'Clients.last_name as last_name', 'Clients.nik as nik_wajib_pajak',
            'PBB_SKNJOP.nop as nop'
        )
        .first();
    } catch (error) {
        
    }
}

module.exports = {
    getBphtbAllList,
    getBphtbData
}