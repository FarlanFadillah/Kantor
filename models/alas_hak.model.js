const db = require('../database/db');

async function getAlasHakDataForm() {
    try {
        return await db('Alas_Hak')
        .leftJoin('AlasHak_Clients', 'AlasHak_Clients.alasHak_id', 'Alas_Hak.id')
        .leftJoin('Clients', 'AlasHak_Clients.client_id', 'Clients.id')
        .select('Alas_Hak.*', 
            'Clients.id as client_id', 'Clients.first_name as first_name', 
            'Clients.last_name as last_name'
        );
    } catch (error) {
        console.log(error)
    }
}