const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model')
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    // set the title for the page
    res.locals.title = 'Dashboard';

    // getting clients total
    res.locals.total_clients = await mainModel.count('Clients');

    // getting alas hak total
    res.locals.total_alas_hak = await mainModel.count('Alas_Hak');

    // getting all bphtb
    const bphtb = await mainModel.getAll('Bphtb');

    // getting client full name and alas hak for every bphtb data
    for(const data of bphtb){
        // getting client data by its id, with specific columns
        let {id, first_name, last_name} = await mainModel.get('Clients', {id : data.wajib_pajak}, ['id','first_name', 'last_name']);

        // getting alas hak data by its id, with specific column
        let {no_alas_hak, kel} = await mainModel.get('Alas_Hak', {id : data.alas_hak_id}, ["no_alas_hak", "kel"])

        // in case clients last name is null
        last_name = last_name || '';

        // set the clients full name
        data.wajib_pajak = first_name + ' ' + last_name;

        // set the clients id
        data.wajib_pajak_id = id;

        // set the alas hak unique number
        data.alas_hak = no_alas_hak + '/' + kel;
    }
    // save all bphtb data's in locals
    res.locals.bphtb = bphtb;

    // render dashboard_page
    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}