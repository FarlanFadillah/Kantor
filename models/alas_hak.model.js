const db = require('../database/db');
const { CustomError } = require('../utils/custom.error');

async function getAlasHakData(id) {
    try {
        return await db('Alas_Hak')
        .leftJoin('AlasHak_Clients', 'AlasHak_Clients.alasHak_id', 'Alas_Hak.id')
        .leftJoin('Clients', 'AlasHak_Clients.client_id', 'Clients.id')
        .select('Alas_Hak.*', 
            'Clients.id as client_id', 'Clients.first_name as first_name', 
            'Clients.last_name as last_name'
        ).where('Alas_Hak.id', id);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


module.exports = {
    getAlasHakData
}