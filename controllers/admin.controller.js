const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model')
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Dashboard';
    res.locals.total_clients = await mainModel.count('Clients');
    res.locals.total_alas_hak = await mainModel.count('Alas_Hak');

    const bphtb = await mainModel.getAll('Bphtb');

    for(const data of bphtb){
        let {id, first_name, last_name} = await mainModel.get('Clients', {id : data.wajib_pajak}, ['id','first_name', 'last_name']);

        last_name = last_name || '';

        data.wajib_pajak = first_name + ' ' + last_name;
        data.wajib_pajak_id = id;
    }
    res.locals.bphtb = bphtb;
    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}