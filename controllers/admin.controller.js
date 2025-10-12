const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const bphtbModel = require('../models/bphtb.model');

/**
 * render dashboard page with bphtb list
 */
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    // set the title for the page
    res.locals.title = 'Dashboard';

    // getting clients total
    res.locals.total_clients = await mainModel.count('Clients');

    // getting alas hak total
    res.locals.total_alas_hak = await mainModel.count('Alas_Hak');

    // getting pbb total
    res.locals.total_pbb = await mainModel.count('PBB_SKNJOP');

    // getting all bphtb with join table
    const bpthb_table = await bphtbModel.getBphtbAllList();
    
    // save all bphtb data's in locals
    res.locals.bphtb = bpthb_table;

    // render dashboard_page
    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}