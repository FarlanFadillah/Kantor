const mainModel = require('../models/main.model');
const bphtbModel = require('../models/bphtb.model');
const { getAddressDetail } = require('../helper/address.form.helper');

async function getDashboardData(){
    const [total_clients, total_alas_hak, total_pbb, bphtb_data] = await Promise.all([
        await mainModel.count('Clients'),
        await mainModel.count('Alas_Hak'),
        await mainModel.count('PBB_SKNJOP'),
        await bphtbModel.getBphtbAllList()
    ])

    // get address detail
    await Promise.all(
        bphtb_data.map(async(table)=>{
            if(table.alas_hak.address_code) await getAddressDetail(table.alas_hak);
        })
    );

    return {total_clients, total_alas_hak, total_pbb, bphtb_data};
}


module.exports = {
    getDashboardData
}