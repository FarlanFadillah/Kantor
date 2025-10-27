const asyncHandler = require("../utils/asyncHandler");
const { getDashboardData } = require("../services/admin.service");

/**
 * render dashboard page with bphtb list
 */
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    // set the title for the page
    res.locals.title = 'Dashboard';

    const {total_clients, total_alas_hak, total_pbb, bphtb_data} = await getDashboardData();

    res.locals.total_clients = total_clients;
    res.locals.total_alas_hak = total_alas_hak;
    res.locals.total_pbb = total_pbb;
    res.locals.bphtb = bphtb_data;

    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}