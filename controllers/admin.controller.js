const asyncHandler = require("../utils/asyncHandler");
const bphtbModel = require('../models/bphtb.model')
const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Dashboard';

    res.locals.bphtb = await bphtbModel.getAll();

    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}