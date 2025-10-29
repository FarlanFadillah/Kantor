const { addAddressDetail } = require('../helper/address.form.helper');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const mainModel = require('../models/main.model');

async function getClientData(client_id){
    try {
        // get the client data by its id
        const client_data = await mainModel.get('Clients', {id : client_id});

        // convert the date time to local time asia/jakarta
        convertLocalDT(client_data);

        // get the address details
        await addAddressDetail(client_data);

        return client_data;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getClientDataList(limit, offset){
    try {
        const total_pages = Math.ceil(await mainModel.count('Clients') / Number(limit));
        
        const clients_data = await mainModel.getPaginationList(
                'Clients', 
                ['nik', 'first_name', 'last_name', 'gender', 'job_name', 'id'],
                limit, 
                offset, 
                'updated_at', 
                'desc'
            );

        return {clients_data, total_pages};
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


async function addClient(client_data){
    try {
        const client = await mainModel.addReturnColumn('Clients', client_data, 'id');
        
        return client.id;
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function deleteClient(client_id){
    try {
        await mainModel.del('Clients', {id : client_id});
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function updateClient(client_id, client_data) {
    try {
        await mainModel.update('Clients', client_data, {id : client_id});
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
    
}


module.exports = {
    getClientData,
    getClientDataList,
    addClient,
    deleteClient,
    updateClient
}