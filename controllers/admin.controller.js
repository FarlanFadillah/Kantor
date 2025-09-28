const asyncHandler = require("../utils/asyncHandler");
const bphtbModel = require('../models/bphtb.model');
const clientModel = require('../models/clients.model')
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Dashboard';
    res.locals.total_clients = await clientModel.getClientTotal();

    const bphtb = await bphtbModel.getAll();

    for(const data of bphtb){
        let {first_name, last_name} = await clientModel.getClient(['first_name', 'last_name'], {nik : data.wajib_pajak});

        last_name = last_name || '';

        data.wajib_pajak = first_name + ' ' + last_name;
    }
    res.locals.bphtb = bphtb;
    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}