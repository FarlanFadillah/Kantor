const asyncHandler = require("../utils/asyncHandler");

const renderDashboardPage = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Dashboard';
    res.status(200).render('pages/dashboard_page');
});


module.exports = {
    renderDashboardPage
}